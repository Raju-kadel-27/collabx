import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

function CustomNode({ data }: any) {
    return (
        <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
            <div className="flex">
                <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">
                    {data.emoji}
                </div>
                <div className="ml-2">
                    <div className="text-lg font-bold">{data.name}</div>
                    <div className="text-gray-500">{data.job}</div>
                </div>
            </div>

            <form>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" placeholder="Enter your name" required />
                <br />

                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" placeholder="Enter your message" rows={4} required></textarea>
                <br />

                <label htmlFor="color">Choose a color:</label>
                <input type="color" id="color" name="color" value="#ff0000" required />
                <br />

                <input type="submit" value="Submit" />
            </form>
            

            <Handle type="target" position={Position.Top} className="w-16 !bg-teal-500" />
            <Handle type="source" position={Position.Bottom} className="w-16 !bg-teal-500" />
        </div>
    );
}

export default memo(CustomNode);
