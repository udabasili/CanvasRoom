import { Socket } from 'socket.io-client';

export class GroupSocket {
  private socket: Socket;

  constructor(socket: Socket) {
    if (!socket) {
      throw new Error('Socket instance is required');
    }
    this.socket = socket;
  }

  /**
   * Join a group
   * @param groupId - The group ID
   * @param userId - The user ID
   * @returns void
   */
  public joinGroup(groupId: string, userId: string) {
    this.socket.emit('joinGroup', { groupId, userId });
  }

  public leaveGroup(groupId: string, userId: string) {
    this.socket.emit('leaveGroup', { groupId, userId });
  }
}
