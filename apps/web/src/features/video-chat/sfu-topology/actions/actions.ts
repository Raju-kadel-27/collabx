export const MEDIA__TYPE = {
    SCREEN__SHARE: 'screenShare',
    CAMERA: 'camera'
}

export const SFU__ACTIONS = {
   /*
    * --------------------SFU TOPOLOGY--------------------
    * ACTIONS DEFINED FOR WEBRTC CONNECTION AND ITS HANDLING
    */

    SEND__JOYS:'send__joys',
    CONNECTION__SUCCESS: 'connection__success',
    CREATE__RINGING__FOR__DUAL: "create__ringing__for__dual",
    CREATE__RINGING__FOR__GROUP: "create__ringing__for__group",
    REGISTER__ONLINE__USER: 'register__online__user',
    JOIN_FOR_SOCKET_USER_MAP: 'join__for__socket__user__map',
    GET__ONLINE__USER: 'get__online__user',
    NEW__PRODUCER: 'new__producer',
    PRODUCER__CLOSED: 'producer__closed',
    GET__PRODUCERS: 'get__producers',
    JOIN: 'join',
    TOGGLE__MEDIA__SIGNAL: 'toggle__media__signal',
    CREATE__WEBRTC__TRANSPORT: 'create__webrtc__transport',
    TOGGLE__TO__SCREEN__SHARE: 'toggle__to__screen__share',
    TOGGLE__TO__CAMERA: 'toggle__to__camera',
    ADD__PEER: 'add',
    LEAVE: 'leave',
    MUTE: 'mute',
    UNMUTE: 'unmute',
    MUTE__INFO: 'mute__info',
    REMOVE__PEER: 'remove__peer',
    DISCONNECTING: 'disconnecting',
    CONSUMER__RESUME: 'consumer__resume',
    REMOVE__PREVIOUS__PRODUCER: 'remove__previous__producer',
    HOLD__CLIENT: 'hold__client',

    // These event are library based (Do not change)
    TRACK__ENDED: 'trackended',
    TRANSPORT__CLOSE: 'transportclose',
    TRANSPORT__CONNECT: 'transport-connect',
    TRANSPORT__PRODUCE: 'transport-produce',
    TRANSPORT__RECV__CONNECT: 'transport-recv-connect',
    PRODUCER__CLOSE: 'producerclose',
    PRODUCE: 'produce',
    CONNECT: 'connect',
    CONSUME: 'consume',
    CLOSE: 'close',
    DISCONNECT: 'disconnect',
    DTLS__STATE__CHANGE: 'dtlsstatechange',
    CLOSED: 'closed',
    WORKER__DIED: 'died'
}