
// In normal chat app, do not think of webrtc data channels.
// ( Assume, you have 100 peoples in a chat-group,
// so you couldnot have that number of webrtc connections for chat functionality).
// Avoiding overthinking, simply handle with websocket servers.

// (** This is just the concept of utilizing the webrtc channels which are already present. **)
// Now proceeding with video-chat ,
// In MESH (MAX 3 users)
// Since you have p2p connection among them, you post message using api server to database
// and send that message to other people using data channels for realtime.

// In SFU Mode
// First store the message in database.
// Send messsage to every data consumer of that room, being producer and update ui in realtime.

// If I am able to autoswitch among modes,
// Simply track the current mode and choose which data channels to send the messages.
// 



