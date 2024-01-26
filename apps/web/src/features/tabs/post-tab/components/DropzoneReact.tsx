import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { BsPlusSquareDotted } from "react-icons/bs";

export default function DropzoneReact() {

    const onDrop = useCallback((acceptedFiles: any) => {
        console.log({ acceptedFiles });
    }, []);

    const {
        getRootProps,
        getInputProps,
        isDragActive } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    (
                        <>
                            <BsPlusSquareDotted color={'gray'} size={36} />
                            <p>Drop the files here ...</p>
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </>

                    ) : (
                        null
                    )

            }
        </div>
    )
}