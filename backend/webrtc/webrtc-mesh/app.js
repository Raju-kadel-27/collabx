const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const cors = require('cors');
const { MESH__ACTIONS: ACTIONS } = require('./actions');
const port = 5003;
const dotenv = require("dotenv");
const { notFound, errorHandler } = require("./errorMiddleware");

app.use(cors());
dotenv.config();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Websocket server is running...');
})

const socketUserMap = {};
const clientUsersMap = {};
const onlineUsers = new Set();
const socketEditorsMap = {};

function getAllConnectedClients(roomId) {
    // Map
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
            return {
                socketId,
                userName: socketEditorsMap[socketId],
            };
        }
    );
};

const leaveRoom = () => {
    const { rooms } = socket
    rooms.forEach((roomId) => {
        const peerClients = Array.from(io.sockets.adapter.rooms.get(roomId) || [])
        peerClients.forEach((socketId) => {
            io.to(socketId).emit(ACTIONS.REMOVE_PEER, {
                peerId: socket.id,
                userId: socketUserMap[socket.id]
            })
        })
        socket.leave(roomId)
    })

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    const targetSocketId = socket.id
    const userId = getKeyByValue(clientUsersMap, targetSocketId);

    onlineUsers.delete(userId);
    delete socketUserMap[socket.id]
};

io.on('connection', (socket) => {
    console.log("New Connection", socket.id)

    // Newer features are being added here
    socket.on(ACTIONS.SEND__JOYS, (userId) => {
        const socketId = clientUsersMap[userId]
        io.to(socketId).emit(ACTIONS.SEND__JOYS, { message: 'BIRTHDAY' })
    })

    socket.on(ACTIONS.REGISTER__ONLINE__USER, ({ userId }) => {
        console.log('register online user',{userId});
        clientUsersMap[userId] = socket.id
        onlineUsers.add(userId);
        io.emit(ACTIONS.GET__ONLINE__USER, { onlineUsers: Array.from(onlineUsers) });
    })

    socket.on(ACTIONS.GET__ONLINE__USER, () => {
        socket.emit(ACTIONS.GET__ONLINE__USER, { onlineUsers: Array.from(onlineUsers) })
    })

    socket.on(ACTIONS.CREATE__RINGING__FOR__DUAL, ({ receiverId, caller }) => {
        const receiverSocketId = clientUsersMap[receiverId]
        io.to(receiverSocketId).emit(ACTIONS.CREATE__RINGING__FOR__DUAL, { caller, roomId: 112233 })
    })

    socket.on(ACTIONS.JOIN, ({ roomId, userDetails }) => {
        console.log('join called');
        socketUserMap[socket.id] = userDetails;
        const getPeerSocketIdFromRoom = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        getPeerSocketIdFromRoom.forEach((socketId) => {

            io.to(socketId).emit(
                ACTIONS.ADD__PEER, {
                peerId: socket.id,
                clientDetails: userDetails,
                createOffer: false
            })

            socket.emit(
                ACTIONS.ADD__PEER, {
                peerId: socketId,
                clientDetails: socketUserMap[socketId],
                createOffer: true
            })

        })
        socket.join(roomId)
        console.log({socketUserMap,clientUsersMap})
    })

    socket.on(
        ACTIONS.CHANGE__MEDIA__STREAM__TO__SCREEN__SHARE,
        ({ roomId, userDetails, socketType }) => {
            const getPeerSocketIdFromRoom = Array.from(
                io
                    .sockets
                    .adapter.rooms
                    .get(roomId) || []);

            if (socketType == 'presenter') {
                getPeerSocketIdFromRoom.forEach((socketId) => {

                    if (socketId != socket.id) {
                        io.to(socketId).emit(
                            ACTIONS.CHANGE__MEDIA__STREAM__TO__SCREEN__SHARE, {
                            peerId: socket.id,
                            clientDetails: userDetails,
                            createOffer: false
                        })

                        socket.emit(
                            ACTIONS.CHANGE__MEDIA__STREAM__TO__SCREEN__SHARE, {
                            peerId: socketId,
                            clientDetails: socketUserMap[socketId],
                            createOffer: true
                        })
                    }
                })
            }
        })

    socket.on(ACTIONS.ICE__CANDIDATE__TRANSPORTER, ({ peerId, iceCandidate }) => {
        console.log('ice-candidate')
        io.to(peerId).emit(ACTIONS.EXCHANGE__ICE__CANDIDATE, {
            peerId: socket.id,
            iceCandidate
        })
    })

    socket.on(ACTIONS.SESSION__DESCRIPTION__TRANSPORTER, ({ peerId, sessionDescription }) => {
        console.log('session desc')
        io.to(peerId).emit(ACTIONS.EXCHANGE__SESSION__DESCRIPTION, {
            peerId: socket.id,
            sessionDescription
        })
    })

    socket.on(ACTIONS.MUTE__INFO, ({ userId, roomId, isMute }) => {
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || [])
        clients.forEach((socketId) => {
            if (socketId !== socket.id) {
                io.to(socketId).emit(ACTIONS.MUTE__INFO, {
                    peerId: socket.id,
                    isMute,
                    userId
                })
            }
        })
        io.to(roomId).emit(ACTIONS.MUTE__INFO, { userId, isMute })
    })

    socket.on(ACTIONS.MUTE, ({ roomId, userId }) => {
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || [])
        clients.forEach((socketId) => {
            io.to(socketId).emit(ACTIONS.MUTE, {
                peerId: socket.id,
                userId
            })
        })
    })

    socket.on(ACTIONS.UNMUTE, ({ roomId, userId }) => {
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || [])
        clients.forEach((socketId) => {
            io.to(socketId).emit(ACTIONS.UNMUTE, {
                peerId: socket.id,
                userId
            })
        })
    })

    // socket.on(ACTIONS.LEAVE, leaveRoom)
    // socket.on(ACTIONS.DISCONNECTING, leaveRoom)

    /* 
    * Beautiful socket handlers of Realtime-code-collaborators
    * Let's seek them directly into the github__box
    */

    socket.on(ACTIONS.JOIN_FROM_CODE_EDITOR, ({ roomId, userName }) => {
        socketEditorsMap[socket.id] = userName;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);

        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED_FROM_CODE_EDITOR, {
                clients,
                userName,
                socketId: socket.id,
            });
        });
    });

    socket.on(ACTIONS.CODE_CHANGE_FROM_CODE_EDITOR, ({ roomId, code }) => {
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE_FROM_CODE_EDITOR, { code });
    });

    socket.on(ACTIONS.SYNC_CODE_FROM_CODE_EDITOR, ({ socketId, code }) => {
        io.to(socketId).emit(ACTIONS.CODE_CHANGE_FROM_CODE_EDITOR, { code });
    });

    socket.on(ACTIONS.DISCONNECTING_FROM_CODE_EDITOR, () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED_FROM_CODE_EDITOR, {
                socketId: socket.id,
                userName: socketEditorsMap[socket.id]
            });
        });
        delete socketEditorsMap[socket.id];
        // socket.leave();
    });

    /**
     * Beautiful socket handlers for canvas element
     * Look how good they are in this conditions
     */


    // Exchanging canvas Element
    socket.on('canvas-data', (data) => {
        socket.broadcast.emit('canvas-data', data);
    })

    //Chat system starts here
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });

    // Realtime Map Tracking System

    // Code collaboration tools
})

app.use(notFound);
app.use(errorHandler);

server.listen(port, () => {
    console.log(`MESH app listening on port ${port}`)
})