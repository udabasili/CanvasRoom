import { Socket } from 'socket.io-client';

export class ChannelSocket {
  private socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  public joinChannel(codingProjectId: string, groupId: string, userId: string) {
    this.socket.emit('joinChannel', { codingProjectId, groupId, userId });
  }
}
