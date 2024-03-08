
/**
 * List of all available mediastreams
 */

const MEDIA__TYPE = {
    SCREEN__SHARE: 'screenShare',
    CAMERA: 'camera'
}

const MESH__ACTIONS = {

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

const SFU__ACTIONS = {

    /**
    * --------------------SFU TOPOLOGY--------------------
    * ACTIONS DEFINED FOR WEBRTC CONNECTION AND ITS HANDLING
    */

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
    JOIN: 'join',
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


    // These event are library based (cannot be made custom)
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

const CODEMIRROR__ACTIONS = {
    /*
   * ACTIONS DEFINED FOR REALTIME-CODE-EDITOR
   */
    JOIN__FROM__CODE__EDITOR: 'join',
    JOINED__FROM__CODE__EDITOR: 'joined',
    DISCONNECTED__FROM__CODE__EDITOR: 'disconnected',
    CODE__CHANGE__FROM__CODE__EDITOR: 'code-change',
    SYNC__CODE__FROM__CODE__EDITOR: 'sync-code',
    LEAVE__FROM__CODE__EDITOR: 'leave',
    DISCONNECTING__FROM__CODE__EDITOR: 'disconnect__from__editor'

}

module.exports = {
    MEDIA__TYPE,
    MESH__ACTIONS,
    SFU__ACTIONS,
    CODEMIRROR__ACTIONS
}


// const ACTIONS = {
//     /**
//      * ACTIONS DEFINED FOR WEBRTC CONNECTION AND ITS HANDLING
//      */
//     CHANGE_MEDIA_STREAM_TO_SCREEN_SHARE: 'change_media_stream_to_screen_share',
//     CHANGE_MEDIA_STREAM_TO_CAMERA: 'change_media_stream_to_camera',
//     CREATE_RINGING_FOR_DUAL: "create_ringing_for_dual",
//     CREATE_RINGING_FOR_GROUP: "create_ringing_for_group",
//     REGISTER_ONLINE_USER: 'register_online_user',
//     GET_ONLINE_USER: 'get_online_user',
//     JOIN: 'join',
//     TOGGLE_TO_SCREEN_SHARE: 'toggle_to_screen_share',
//     TOGGLE_TO_CAMERA: 'toggle_to_camera',
//     ADD_PEER: 'add',
//     LEAVE: 'leave',
//     ICE_CANDIDATE_TRANSPORTER: 'ice_candidate_transporter',
//     SESSION_DESCRIPTION_TRANSPORTER: 'session_description_transporter',
//     EXCHANGE_ICE_CANDIDATE: 'exchange_ice_candidate',
//     EXCHANGE_SESSION_DESCRIPTION: 'exchange_session_description',
//     MUTE: 'mute',
//     UNMUTE: 'unmute',
//     MUTE_INFO: 'mute_info',
//     REMOVE_PEER: 'remove_peer',
//     DISCONNECTING: 'disconnecting',

//     /**
//      * ACTIONS DEFINED FOR REALTIME-CODE-EDITOR
//      */
//     JOIN_FROM_CODE_EDITOR: 'join',
//     JOINED_FROM_CODE_EDITOR: 'joined',
//     DISCONNECTED_FROM_CODE_EDITOR: 'disconnected',
//     CODE_CHANGE_FROM_CODE_EDITOR: 'code-change',
//     SYNC_CODE_FROM_CODE_EDITOR: 'sync-code',
//     LEAVE_FROM_CODE_EDITOR: 'leave',
//     DISCONNECTING_FROM_CODE_EDITOR:'disconnect_from_editor'

// }
// module.exports = { ACTIONS }