import { useState, useContext, createContext } from 'react';

const ChannelDataContext = createContext()

export const ChannelDataProvider = ({ children }) => {

    const [message, setMessage] = useState([]);
    const [audio, setAudio] = useState('');
    const [video, setVideo] = useState('');
    const [file, setFile] = useState('');

    return (
        <ChannelDataContext.Provider
            value={{
                message,
                setMessage,
                audio,
                setAudio,
                video,
                setVideo,
                file,
                setFile
            }}
        >
            {children}

        </ChannelDataContext.Provider>
    )
}

export const useChannelDataContext = () => useContext(ChannelDataContext);