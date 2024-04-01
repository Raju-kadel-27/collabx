import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useEffect, useState } from "react";
import { getSocket } from "../../../shared/helpers/socket";

export const DocsEditor = () => {
    const socket = getSocket()
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const handleDocumentUpdate = ({ data }) => {
        setEditorState(EditorState.createWithContent(convertToRaw(data)));
    }

    useEffect(() => {
        socket.on('documentState', handleDocumentUpdate);
        return () => socket.off('documentState', handleDocumentUpdate);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            const container = document.querySelectorAll('.rdw-editor-main');
            container.forEach((element) => {
                element.style.overflow = 'hidden'
                element.style.height = '80vh'
            });
        }, 1)
    }, []);

    const handleEditorChange = (newEditorState) => {
        setEditorState(newEditorState);
        const contentState = convertToRaw(newEditorState.getCurrentContent());
        socket.emit('message', { type: 'operation', operation: contentState });
    };

    return (
        <div className="h-screen w-full absolute top-0 right-0 z-40 bg-[#F8F9FA]">
            <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                toolbarClassName="flex sticky top-0 !justify-center z-40 mx-auto"
                editorClassName="mt-6 h-screen p-10 bg-white max-w-5xl mx-auto mb-12 border"
            />;
        </div>
    )
}

