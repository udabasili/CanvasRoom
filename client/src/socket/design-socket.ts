import { Socket } from 'socket.io-client';

export class DesignSocket {
  private socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  public designAddedEmitter(
    groupId: string,
    channelId: string,
    userId: string,
    value: string,
  ) {
    this.socket.emit('object-added', {
      groupId,
      channelId,
      userId,
      value,
    });
  }

  public designUpdatedEmitter(
    groupId: string,
    channelId: string,
    userId: string,
    value: { obj: any; id: any },
  ) {
    this.socket.emit('object-modified', {
      groupId,
      channelId,
      userId,
      value,
    });
  }

  public designAddListener(callback: (data: any) => void) {
    this.socket.on('object-added', callback);
  }

  public designUpdateListener(callback: (data: any) => void) {
    this.socket.on('object-modified', callback);
  }

  public designRemoveListener() {
    this.socket.off('object-added');
    this.socket.off('object-modified');
  }
}
