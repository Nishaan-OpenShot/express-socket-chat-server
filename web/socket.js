'use strict';

const path = require('path');
const helper = require('./../handlers/query-handler');
const CONSTANTS = require('./../config/constants');

class Socket {
    constructor(socket) {
        this.io = socket;
    }

    socketEvents() {
        this.io.on('connection', (socket) => {

            /* Get the user's Chat list	*/
            socket.on(`chat-list`, async (data) => {
                if (data.userId == '') {
                    this.io.emit(`chat-list-response`, {
                        error : true,
                        message : CONSTANTS.USER_NOT_FOUND
                    });
                } else {
                    try {
                        const [UserInfoResponse, chatlistResponse] = await Promise.all([
                                queryHandler.getUserInfo( {
                                    userId: data.userId,
                                    socketId: false
                                }),
                                queryHandler.getChatList( socket.id )
                            ]);
                        this.io.to(socket.id).emit(`chat-list-response`, {
                            error : false,
                            singleUser : false,
                            chatList : chatlistResponse
                        });
                        socket.broadcast.emit(`chat-list-response`,{
                            error : false,
                            singleUser : true,
                            chatList : UserInfoResponse
                        });
                    } catch ( error ) {
                        this.io.to(socket.id).emit(`chat-list-response`,{
                            error : true ,
                            chatList : []
                        });
                    }
                }
            });
        })
    }

    socketConfig() {
        this.io.use( async (socket, next) => {
            try {
                await queryHandler.addSocketId({
                    userId: socket.request._query['userId'],
                    socketId: socket.id
                });
                next();
            } catch(error) {
                console.error(error);
            }
        });
        this.socketEvents();
    }

}
module.exports = Socket;