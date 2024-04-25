import {
    isLastMessage,
    isSameSender,
    isSameSenderMargin,
    isSameUser,
} from "../utils/ChatLogics";
import { useGetAllMessagesQuery } from "../redux/apis/messageApiSlice";
import { textChatSelector } from "../redux/slices/ChatSlice";
import { useSelector } from "react-redux";
import { tokenSelector, userSelector } from "../../authentication/redux/slices/userSlice";
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import PulseLoader from 'react-spinners/PulseLoader';
import { useEffect, useState } from "react";
import { SignalingManager } from "@/features/websocket/SignalingManager";

const ScrollableChat = () => {

    const [txtMsg,setTxtMsg]=useState<any>([])

    const jwtToken = useSelector(tokenSelector);
    const user = useSelector(userSelector, (prev, next) => prev === next);
    const { selectedChat } = useSelector(textChatSelector, (prev, next) => prev === next);
    console.log({ selectedChat },"#######################");
    const { data: messages} = useGetAllMessagesQuery(selectedChat._id, {
        skip: !selectedChat._id,
        refetchOnFocus:true
    });
    console.log({ user, messages},"#######################");

    useEffect(()=>{
        if(messages?.length){
            setTxtMsg(messages);
        }
    },[messages]);

  useEffect(() => {
        SignalingManager.getInstance().updateUuid(user._id, jwtToken)
        //@ts-ignore
        console.log("############################################ INITIALIZED ##################################################");
        SignalingManager.getInstance().signaling?.on("CHAT_MESSAGE",(payload)=>{
            console.log({payload},"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            const wsMsg=payload?.messages[0];
            console.log({wsMsg});
            setTxtMsg((prev:any)=>[...prev,wsMsg]);
        })
    }, []);

    return (
        <div className="w-full pl-1 h-full">
            {txtMsg?.length > 0 ?
            //@ts-ignore
                txtMsg?.map((m, i) => (
                    <div className="overflow-y-auto w-full" style={{ display: "flex", justifyContent: 'start' }} key={i}>
                        {/* {(isSameSender(messages, m, i, user._id) ||
                            isLastMessage(messages, i, user._id)) && (
                                <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                                    <Avatar
                                        mt="7px"
                                        mr={1}
                                        size="sm"
                                        cursor="pointer"
                                        name={m.sender.name}
                                        src={m.sender.pic}
                                    />
                                </Tooltip>
                            )} */}
                        <span
                            // className={`w-fit rounded-lg mt-1 px-2 p-1 text-[13px] ${m.sender._id === user._id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-800'}`}
                            // style={{
                            //     marginLeft: isSameSenderMargin(messages, m, i, user._id),
                            //     //@ts-ignore
                            //     marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                            //     overflow: 'hidden'
                            // }}
                        >
                            {m.message}
                        </span>
                    </div>
                )) :
                (
                    <div className="w-full h-full justify-center items-center">
                        <PulseLoader speedMultiplier={0.6} size={16} color="blue" />
                    </div>
                )
            }
        </div>
    );
};
export default ScrollableChat;
