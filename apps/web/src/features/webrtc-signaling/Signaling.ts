
import EventEmitter from "eventemitter3";
import {
    CHAT_MESSAGE,
    DELETE_MESSAGE,
    NOTIFICATION_ADD,
    RECONNECTING,
    SIGNALING_CONNECTED,
    WS_READY
} from "./constants";

let REALTIME_WS_URL = 'ws://localhost:8082';

export class Signaling extends EventEmitter {
    ws?: WebSocket;
    destroyed = false;
    jwt: string;
    uuid: string;
    private bufferedMessages: any[] = [];
    private state: "connected" | "disconnected" = "disconnected";

    constructor(uuid: string, jwt: string) {
        super();
        this.uuid = uuid;
        this.jwt = jwt;
        this.initWs();
    }
    async initWs() {
        try {
            const ws = new WebSocket(`${REALTIME_WS_URL}?jwt=${this.jwt}`);
            ws.addEventListener("open", () => {
                this.state = "connected";
                this.bufferedMessages.forEach((x) => this.send(x));
                this.bufferedMessages = [];
                console.log('Ws open() ')
                // this.send({ type: 'TEST_MESSAGE', payload: { content: 'Testing--backend-ws' } })
            });
            ws.addEventListener("message", (event) => {
                this.handleMessage(event.data);
                console.log('New Message is received', JSON.parse(event.data));
            });
            ws.addEventListener("close", () => {
                console.log('New close event is called now');
                this.state = "disconnected";
                if (!this.destroyed) {
                    this.emit(RECONNECTING);
                    setTimeout(() => {
                        // TODO: exponentially backoff here
                        if (!this.destroyed) {
                            this.initWs();
                        }
                    }, 3000);
                }
            });
            this.ws = ws;
        } catch (e) {
            console.error("Error while creating ws connection");
            console.error(e);
        }
    }
    handleMessage(data: string) {
        try {
            const message: any = JSON.parse(data);
            console.log({ message });
            switch (message.type) {
                case CHAT_MESSAGE:
                    console.log('Inside emitter ###')
                    this.emit(CHAT_MESSAGE, message.payload);
                    break;
                case WS_READY:
                    this.emit(SIGNALING_CONNECTED);
                    break;
                case NOTIFICATION_ADD:
                    this.emit(NOTIFICATION_ADD, message.payload);
                    break;
                case DELETE_MESSAGE:
                    this.emit(DELETE_MESSAGE, message.payload);
                    break;
                default:
                    console.error(`Invalid type of message found ${data}`);
            }
        } catch (e) {
            console.log(`Could not handle data from server ${data}, error: ${e}`);
        }
    }
    destroy() {
        this.destroyed = true;
        this.ws?.close();
    }
    send(message: any) {
        if (this.state === "disconnected") {
            this.bufferedMessages.push(message);
            return;
        }
        this.ws?.send(
            JSON.stringify({
                ...message,
            })
        );
    }
}
