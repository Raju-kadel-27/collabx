import axios from 'axios';
export let BACKEND__URL = 'http://localhost:5000'

function formatPayload(chat:any) {
    return {
        user1: chat.users[0],
        user2: chat.users[1]
    }
}

export const validateRoom = async (
    userId: string,
    room: string,
    jwtToken: string
) => {
    try {
        console.log('userId', userId);
        console.log('room', room);
        console.log('jwtToken', jwtToken);

        const response = await axios.post(`${BACKEND__URL}/api/chats/validateroom`, {
            userId,
            room,
            jwtToken
        }, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
        // @ts-ignore
        const chat = await response.data;
        return formatPayload(chat);

    } catch (error) {
        console.log(error);
    }
};

export const room = '/api/chats/validateroom'