import {
    isLastMessage,
    isSameSender,
    isSameSenderMargin,
    isSameUser,
} from "../helpers/ChatLogics";
import { useGetAllMessagesQuery } from "../redux/apis/messageApiSlice";
import { textChatSelector } from "../redux/slices/ChatSlice";
import { useSelector } from "react-redux";
import { userSelector } from "../../authentication/redux/slices/userSlice";
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import PulseLoader from 'react-spinners/PulseLoader';

const ScrollableChat = () => {

    const user = useSelector(userSelector, (prev, next) => prev === next);

    const { selectedChat } = useSelector(textChatSelector, (prev, next) => prev === next);

    console.log({ selectedChat })

    const { data: messages,
        isLoading: isMessageLoading,
        isError: isMessageError,
        error: messageError,
        isSuccess: isMessageSuccess
    } = useGetAllMessagesQuery(selectedChat._id, {
        skip: !selectedChat._id,
        refetchOnFocus:true
    });

    console.log({ user, messages, isMessageError, isMessageSuccess, isMessageLoading, messageError });

    return (
        <div className="w-full pl-1 h-full">
            {messages?.length > 0 ?
                messages?.map((m, i) => (
                    <div className="overflow-y-auto w-full" style={{ display: "flex", justifyContent: 'start' }} key={m._id}>
                        {(isSameSender(messages, m, i, user._id) ||
                            isLastMessage(messages, i, user._id)) && (
                                <Tooltip label={m.sender.fullName} placement="bottom-start" hasArrow>
                                    <Avatar
                                        mt="7px"
                                        mr={1}
                                        size="sm"
                                        cursor="pointer"
                                        name={m.sender.fullName}
                                        src={m.sender.pic}
                                    />
                                </Tooltip>
                            )}
                        <span
                            className={`w-fit rounded-md mt-1 px-2 p-1 text-[13px] ${m.sender._id === user._id ? 'bg-green-400' : 'bg-slate-100 text-slate-700'}`}
                            style={{
                                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                                overflow: 'hidden'
                            }}
                        >

                            {m.content}

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
