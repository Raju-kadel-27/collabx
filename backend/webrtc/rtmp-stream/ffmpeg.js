// Class to handle child process used for running FFmpeg

const child_process = require('child_process');
const { EventEmitter } = require('events');
const ffmpegPath = 'C:\\ffmpeg\\ffmpeg.exe';

const { createSdpText } = require('./sdp');
const { convertStringToStream } = require('./utils');

const RECORD_FILE_LOCATION_PATH = './files';

module.exports = class FFmpeg {
    constructor(rtpParameters) {
        this._rtpParameters = rtpParameters;
        this._process = undefined;
        this._observer = new EventEmitter();
        this._createProcess();
    }

    _createProcess() {
        // console.log('called _createProcess')
        const commandArgs = [
            '-loglevel',
            'debug',
            '-protocol_whitelist',
            'pipe,udp,rtp',
            '-fflags',
            '+genpts',
            '-analyzeduration', '10M',
            '-probesize', '5M',
            '-f',
            'sdp',
            '-i',
            'pipe:0',
            '-c:v', 'libx264',   // Video codec
            '-c:a', 'aac',       // Audio codec
            '-strict', 'experimental',
            '-f', 'flv',
            'rtmp://a.rtmp.youtube.com/live2/97py-9qzf-bad7-b25t-5457', // Your YouTube RTMP URL

        ];

        const cmdArgStr = [
            "gst-launch-1.0",
            "--eos-on-shutdown",
            `filesrc location=input-vp8.sdp`,
            "! sdpdemux timeout=0 name=demux",
            "demux. ! queue",
            "! rtpopusdepay",
            "! opusparse",
            "! audioconvert",
            "! audioresample",
            "! voaacenc",
            "! mux.",
            "demux. ! queue",
            "! rtpvp8depay",
            "! vp8dec",
            "! videoconvert",
            "! x264enc bitrate=2048 speed-preset=superfast tune=zerolatency",
            "! video/x-h264,profile=baseline",
            "! mux.",
            `flvmux name=mux streamable=true`,
            `! rtmpsink location=rtmp://a.rtmp.youtube.com/live2/YOUR_YOUTUBE_STREAM_KEY`,
        ]
            .join(" ")
            .trim();





        //    let commandArgs = [
        //     '-re', // Read the input at the native frame rate
        //     '-i', 'pipe:0', // Use the relative path to your local video file
        //     '-c:v', 'libx264', // H.264 video codec
        //     '-c:a', 'aac', // AAC audio codec
        //     '-f', 'flv', // FLV container format
        //     'rtmp://a.rtmp.youtube.com/live2/97py-9qzf-bad7-b25t-5457', // Your YouTube RTMP URL
        // ]

        const sdpString = createSdpText(this._rtpParameters);
        const sdpStream = convertStringToStream(sdpString);
        if (sdpStream) console.log('sdpStream is present')
        // console.log({ sdpString })
        // console.log({ sdpStream })

        this._process = child_process.spawn(ffmpegPath, this._commandArgs);

        if (this._process.stderr) {
            this._process.stderr.setEncoding('utf-8');

            this._process.stderr.on('data', data => {
                // console.log(' ffmpeg  stderr')
                console.log('ffmpeg::process::data [data:%o]', data)
            }
            );
        }

        if (this._process.stdout) {
            this._process.stdout.setEncoding('utf-8');

            this._process.stdout.on('data', data =>
                // console.log('data received stdout')
                console.log('ffmpeg::process::data [data:%o]', data)
            );
        }

        this._process.on('message', message =>
            // console.log('message received', message)
            console.log('ffmpeg::process::message [message:%o]', message)
        );

        this._process.on('error', error =>
            console.error('ffmpeg::process::error [error:%o]', error)
        );

        this._process.once('close', () => {
            console.log('ffmpeg::process::close');
            this._observer.emit('process-close');
        });

        sdpStream.on('error', error => {
            console.log('############ sdp   ###### error #####')
            console.error('sdpStream::error [error:%o]', error)
        }
        );

        // Pipe sdp stream to the ffmpeg process
        sdpStream.resume();
        sdpStream.pipe(this._process.stdin);

    }

    kill() {
        console.log('kill() [pid:%d]', this._process.pid);
        this._process.kill('SIGINT');
    }

    get _commandArgs() {
        let videoPath = './test.mp4';

        // let commandArgs = [
        //     '-re', // Read the input at the native frame rate
        //     '-i', videoPath, // Use the relative path to your local video file
        //     '-c:v', 'libx264', // H.264 video codec
        //     '-c:a', 'aac', // AAC audio codec
        //     '-f', 'flv', // FLV container format
        //     'rtmp://a.rtmp.youtube.com/live2/97py-9qzf-bad7-b25t-5457', // Your YouTube RTMP URL
        // ]

        // let commandArgs = [
        //     '-loglevel', 'debug',
        //     '-protocol_whitelist', 'pipe,udp,rtp',
        //     '-fflags', '+genpts',
        //     '-analyzeduration', '10M',  // Increase the analyzeduration (e.g., 10 megabytes)
        //     '-probesize', '5M',         // Increase the probesize (e.g., 5 megabytes)
        //     '-f', 'sdp',
        //     '-i', 'pipe:0',
        //     // Your other FFmpeg options here
        //   ];

        let commandArgs = [
            '-loglevel',
            'debug',
            '-protocol_whitelist',
            'pipe,udp,rtp',
            '-fflags',
            '+genpts',
            '-f',
            'sdp',
            '-i',
            'pipe:0'
        ];

        // let commandArgs = [
        //     '-loglevel',
        //     'debug',
        //     '-protocol_whitelist',
        //     'pipe,udp,rtp',
        //     '-fflags',
        //     '+genpts',
        //     '-analyzeduration', '10M',  // Increase the analyzeduration (e.g., 10 megabytes)
        //     '-probesize', '5M',         // Increase the probesize (e.g., 5 megabytes)
        //     '-f',
        //     'sdp',
        //     '-i',
        //     'pipe:0'
        // ];

        commandArgs = commandArgs.concat(this._videoArgs);
        commandArgs = commandArgs.concat(this._audioArgs);

        commandArgs = commandArgs.concat([
            /*
            '-flags',
            '+global_header',
            */
            `${RECORD_FILE_LOCATION_PATH}/${this._rtpParameters.fileName}.webm`
        ]);

        // console.log('commandArgs:%o', commandArgs);

        return commandArgs;
    }

    get _videoArgs() {
        return [
            '-map',
            '0:v:0',
            '-c:v',
            'copy'
        ];
    }

    get _audioArgs() {
        return [
            '-map',
            '0:a:0',
            '-strict', // libvorbis is experimental
            '-2',
            '-c:a',
            'copy'
        ];
    }
}
