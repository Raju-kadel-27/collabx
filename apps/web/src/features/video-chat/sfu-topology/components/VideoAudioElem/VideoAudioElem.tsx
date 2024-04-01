export const VideoAudioElem = ({ client, provideRef }) => (

    <div className='w-full h-full rounded-lg'>
        <audio id="remoteAudio"
            autoPlay
            playsInline
            ref={(instance) => {
                provideRef(
                    {
                        instance,
                        clientId: client._id,
                        instanceType: 'audio'
                    });
            }}
        />
        <video id="remoteVideo"
            className="w-[100vw] h-full"
            autoPlay
            playsInline
            ref={(instance) => {
                provideRef(
                    {
                        instance,
                        clientId: client._id,
                        instanceType: 'video'
                    });
            }}
        />
    </div>

)
