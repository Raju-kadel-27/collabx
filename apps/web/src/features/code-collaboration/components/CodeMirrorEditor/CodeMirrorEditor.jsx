import React, { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import { MESH__ACTIONS as ACTIONS } from '../../../video-chat/mesh-topology/actions/actions';

export const CodemirrorEditor = ({socket, roomId, onCodeChange }) => {
    const editorRef = useRef(null);
    editorRef.current?.on('change', (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        console.log({ code }, 'Testing')
        // onCodeChange(code);
        // if (origin !== 'setValue') {
        //     socket.emit(ACTIONS.CODE_CHANGE, {
        //         roomId,
        //         code,
        //     });
        // }
    });

    // dynamically add styling to delayed rendered HTML element 
    useEffect(() => {
        setTimeout(() => {
            const codeMirrorElements = document.querySelectorAll('.CodeMirror');
            codeMirrorElements.forEach((element) => {
                element.style.height = '870px';
                element.style.width = '900px';
                element.style.fontSize = '17px';
            });
            const container = document.querySelectorAll('.container-box');
            container.forEach((element) => {
                element.style.overflow = 'hidden'
                element.style.height = '100vh'
            });
        }, 1)

    }, []);

    // Initialize the CodeMirror Editor
    useEffect(() => {
        async function init() {
            editorRef.current = Codemirror.fromTextArea(
                document.getElementById('realtimeEditor'),
                {
                    mode: { name: 'javascript', json: true },
                    theme: 'dracula',
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                    lineNumbers: true,
                }
            );

            editorRef.current.on('change', (instance, changes) => {
                const { origin } = changes;
                const code = instance.getValue();
                onCodeChange(code);
                if (origin !== 'setValue') {
                    socket.emit(ACTIONS.CODE_CHANGE, {
                        roomId,
                        code,
                    });
                }
            });
        }

        if (socket) {
            init();
        }
    }, [socket]);

    // socket listener for CodeMirror with cleanup
    useEffect(() => {
        if (socket) {
            socket.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                if (code !== null) {
                    editorRef.current.setValue(code);
                }
            });
        }

        return () => {
            socket.off(ACTIONS.CODE_CHANGE);
        };
    }, [socket]);

    return <textarea id="realtimeEditor"></textarea>;

};


