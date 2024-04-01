export interface Message {
    uuid: string;
    message: string;
    client_generated_uuid: string;
    // message_kind: MessageKind;
    created_at: string;
    parent_client_generated_uuid?: string;
    room: string;
    // type: SubscriptionType;
    // message_metadata?: MessageMetadata;
    deleted?: boolean;
}

export interface MessageWithMetadata extends Message {
    parent_message_text?: string;
    parent_message_author_uuid?: string;
}

export interface EnrichedMessage extends MessageWithMetadata {
    direction: "send" | "recv";
    received?: boolean;
    from_http_server: 0 | 1;
}