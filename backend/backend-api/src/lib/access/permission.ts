interface Permission {
    SHARE_VIDEO: string
    SHARE_AUDIO: string
    SCREEN_SHARE: string
    SHARE_FILE: string
    SEND_CHAT: string
}

export const PERMISSIONS: Permission = {
    // The role(s) have permission to share video
    SHARE_VIDEO: 'SHARE_VIDEO',
    // The role(s) have permission to share audio
    SHARE_AUDIO: 'SHARE_AUDIO',
    // The role(s) have permission to share screen
    SCREEN_SHARE: 'SCREEN_SHARE',
    // The role(s) have permission to share file
    SHARE_FILE: 'SHARE_FILE',
    // The role(s) have permission to send chat messages
    SEND_CHAT: 'SEND_CHAT'
}