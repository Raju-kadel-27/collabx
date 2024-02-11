import React from 'react';
import { MessagingTools } from './Tools';


export const MessageInput = ({ handleEmoji, newMessage, typingHandler }: any) => {
    return (
        <div className="flex px-5 w-full h-full">
            
            <input
                type="text"
                value={newMessage}
                onChange={typingHandler}
                placeholder="Type your message"
                className="bg-slate-50 text-md border-none outline-none text-slate-600 w-full "
            />

            <MessagingTools handleEmoji={handleEmoji} />

        </div>
    )
}
