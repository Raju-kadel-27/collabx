import Dexie from 'dexie';
import type { Table } from 'dexie';
import type {
    EnrichedInboxDb,
    EnrichedMessage,
    UserMetadata,
    CollectionChatData,
    LastReceivedUpdateTable,
    LocalImageData
} from '../types'

const getIndexDb = () => ({});

export interface Friend {
    id?: number;
    name: string;
    age: number;
}
export class CollabX extends Dexie {
    inbox!: Table<EnrichedInboxDb>;
    messages!: Table<EnrichedMessage>;
    users!: Table<UserMetadata>;
    collections!: Table<CollectionChatData>;
    updates!: Table<LastReceivedUpdateTable>;
    localImageData!: Table<LocalImageData>;

    constructor(uuid: string) {
        super(`DB_${uuid}`, {
            ...getIndexDb()
        })
        this.version(1).stores({
            inbox: "remoteUserId, id, blocked, interacted, areFriends",
            messages: "client_generated_uuid, room, type, from_http_server",
            users: "uuid",
            groups: "groupId",
            updates: "room",
            localImageData: "key"
        })
    }
};

export const getDb = (uuid: string) => new CollabX(uuid)






