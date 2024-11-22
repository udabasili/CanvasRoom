import {Socket} from "socket.io";
import {Group} from "@/model/group";
import {getIO} from "@/loaders/socket";
import Logger from "@/loaders/logger";

/**
 *
 * @param socket
 */
 async function generalGroupListener(socket: Socket){
    const groups = await Group.find({});
    groups.forEach(group => {
        const io = getIO()
        io.to(group.id).emit('hello', 'world');
    })

}

async function joinGroupListener(socket: Socket){
    socket.on('joinGroup', async (data) => {
        const {userId, groupId} = data
        socket.join(groupId)
        Logger.silly(`User ${userId} joined group ${groupId}`)
    })
}


export default async ({socket}:{socket: Socket}) => {
    await generalGroupListener(socket)
    await joinGroupListener(socket)
}