import { User } from "./User";
import WebSocket from "ws";

export class UserManager {
    private static instance: UserManager;
    private users: Map<string, User>;

    private constructor() {
        this.users = new Map<string, User>();
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new UserManager()
        }
        return this.instance;
    }

    addUser(
        jwt: string,
        userId: string,
        ws: WebSocket
    ) {
        const user = new User(jwt, userId, ws);

        ws.on('close', () => {
            user.destroy();
            this.users.delete(userId)
        })
        this.users.set(userId, user);
    }

    isUserAdded(userId: string): boolean {
        return this.users.has(userId)
    }

}
