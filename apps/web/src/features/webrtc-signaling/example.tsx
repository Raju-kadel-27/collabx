// EventEmitter handling logic from websocket
import EventEmitter from 'eventemitter3';
const webrtcEmitter = new EventEmitter();

function handleRemotePeerEvent(peerId, eventType) {
  webrtcEmitter.emit('remote-peer-event', { peerId, eventType });
}
const remotePeerId = 'remote123';
handleRemotePeerEvent(remotePeerId, 'video-muted');


// React based eventemitter handling
import React, { useEffect } from 'react';
// Duplicate Entries
// import EventEmitter from 'eventemitter3';
// const webrtcEmitter = new EventEmitter();

export const VideoComponent = () => {
  console.log('VideoComponent is rendering here');
  useEffect(() => {
    const handleRemotePeerEvent = ({ peerId, eventType }: any) => {
      console.log(`Remote peer ${peerId} triggered event: ${eventType}`);
    };
    webrtcEmitter.on('remote-peer-event', handleRemotePeerEvent);
    return () => {
      webrtcEmitter.removeListener('remote-peer-event', handleRemotePeerEvent);
    };
  }, []);
  return (
    <div>
    </div>
  );
};




