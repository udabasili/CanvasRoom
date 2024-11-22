import {Server as SocketIOServer, Socket} from "socket.io";
import {getIO} from "@/loaders/socket";


/**
 *
 * @param socket
 */
export function generalChatListener(socket: Socket){
    socket.on('chat', (msg: String) => {
        console.log('message: ' + msg);
        socket.emit('chat', msg + "server")
    });
}