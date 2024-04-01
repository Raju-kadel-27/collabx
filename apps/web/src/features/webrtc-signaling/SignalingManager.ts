
import { Signaling } from "./Signaling";


export class SignalingManager {
  private static instance: SignalingManager;
  private signaling?: Signaling;
  public uuid = "";
  updateLastReadTimeout?: { [room: string]: number };
  public postSubscribes: Set<{
    room: string;
    type: SubscriptionType;
    mint: string;
    publicKey: string;
  }> = new Set<{
    room: string;
    type: SubscriptionType;
    mint: string;
    publicKey: string;
  }>();

  private constructor() { }

  updateUuid(uuid: string, jwt: string) {
    this.signaling?.destroy();
    this.signaling = new Signaling(uuid, jwt);
    this.uuid = uuid;
    this.initHandlers();
    this.updateLastReadTimeout = {};
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new SignalingManager();
    }
    return this.instance;
  }
  async send(message: any) {
    console.log('** Sending_message_to_server **');
    console.log('** Triggered Send Function **');
    this.signaling?.send(message);
  }
  initHandlers() {
    this.signaling?.on(
      CHAT_MESSAGE,
      async (payload: any) => {
        console.log({ payload }, 'chat__message__payload');
      }
    );
    //@ts-ignore
    this.signaling?.on(NOTIFICATION_ADD, (payload) => {
      console.log(payload, 'notification__add__payload');
    });

    this.signaling?.on(
      DELETE_MESSAGE,
      async (payload: any) => {
        console.log(payload, 'delete__message__is__called');
      }
    );

    this.signaling?.on(WS_READY, () => {
      console.log('ws_ready is triggered');
      // map postSubscribes to send SUBSCRIBE event
    });

    this.signaling?.on(RECONNECTING, () => {
      console.log('RECONNECTING...');
    });

  }
}
