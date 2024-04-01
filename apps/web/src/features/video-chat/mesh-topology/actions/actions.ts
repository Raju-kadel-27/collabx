export const MEDIA__TYPE = {
    SCREEN__SHARE: 'screenShare',
    CAMERA: 'camera'
}

export const MESH__ACTIONS = {

    /**
     * -----------------MESH TOPOLOGY---------------
     * ACTIONS DEFINED FOR WEBRTC CONNECTION AND ITS HANDLING
     */
    SEND__JOYS:'send__joys',
    CHANGE__MEDIA__STREAM__TO__SCREEN__SHARE: 'change__media__stream__to__screen__share',
    CHANGE__MEDIA__STREAM__TO__CAMERA: 'change__media__stream__to__camera',
    CREATE__RINGING__FOR__DUAL: "create__ringing__for__dual",
    CREATE__RINGING__FOR__GROUP: "create__ringing__for__group",
    REGISTER__ONLINE__USER: 'register__online__user',
    GET__ONLINE__USER: 'get__online__user',
    GET__PRODUCERS: 'get__producers',
    JOIN: 'join',
    TOGGLE__TO__SCREEN__SHARE: 'toggle__to__screen__share',
    TOGGLE__TO__CAMERA: 'toggle__to__camera',
    ADD__PEER: 'add',
    LEAVE: 'leave',
    ICE__CANDIDATE__TRANSPORTER: 'ice__candidate__transporter',
    SESSION__DESCRIPTION__TRANSPORTER: 'session__description__transporter',
    EXCHANGE__ICE__CANDIDATE: 'exchange__ice__candidate',
    EXCHANGE__SESSION__DESCRIPTION: 'exchange__session__description',
    MUTE: 'mute',
    UNMUTE: 'unmute',
    MUTE__INFO: 'mute__info',
    REMOVE__PEER: 'remove__peer',
    DISCONNECTING: 'disconnecting',
}