export const isSameSenderMargin = (messages: any, m: any, i: any, userId: any) => {

    if (
        i < messages.length - 1 &&
        messages[i + 1].sender._id === m.sender._id &&
        messages[i].sender._id !== userId
    )
        return 32;
    else if (
        (i < messages.length - 1 &&
            messages[i + 1].sender._id !== m.sender._id &&
            messages[i].sender._id !== userId) ||
        (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
        return 0;
    else return "80%";
};

// try to use-memo here for better optimization and calculation
export const isSameSender = (messages: any, m: any, i: any, userId: any) => {
    return (
        i < messages.length - 1 &&
        (messages[i + 1].sender._id !== m.sender._id ||
            messages[i + 1].sender._id === undefined) &&
        messages[i].sender._id !== userId
    );
};

export const isLastMessage = (messages: any, i: any, userId: any) => {
    console.log({ messages, i, userId })
    return (
        i === messages.length - 1 &&
        messages[messages.length - 1].sender._id !== userId &&
        messages[messages.length - 1].sender._id
    );
};

export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

export const getSender = (loggedUser, users) => {
    return users[0]?._id === loggedUser._id ? users[1]?.name : users[0]?.name;
};

export const getSenderFull = (loggedUser, users) => {

    console.log({loggedUser,users})

    // return users[0]

    return users[0]?._id === loggedUser._id ? users[1] : users[0];
};
