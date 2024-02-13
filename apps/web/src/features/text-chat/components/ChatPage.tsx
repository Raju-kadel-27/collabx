import { ChatContainer } from './Chatbox';
import { Box } from "@chakra-ui/layout";

export default function Chatpage() {

    return (
        <div className='h-screen w-screen flex justify-center' style={{ width: "100%", overflow: 'hidden' }}>
            <Box display={'flex'} justifyContent="space-between" w="100%" h="100vh" p="10px">
                <div className="w-full h-full flex justify-between items-start">
                        <ChatContainer />
                </div>
            </Box>
        </div>
    );
};
