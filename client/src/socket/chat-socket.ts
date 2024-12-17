import { Socket } from 'socket.io-client';

type GroupChatData = {
  sender: string;
  groupId: string;
  message: string;
  channelId: string;
};

type PrivateChatData = {
  recipient: string;
  message: string;
  sender: string;
};

export class ChatSocket {
  private socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  public channelChatEmitter(data: GroupChatData) {
    this.socket.emit('channelChat', data);
  }

  public channelChatListener(callback: (data: any) => void) {
    this.socket.on('channelChat', callback);
  }

  public privateChatEmitter(data: PrivateChatData) {
    this.socket.emit('codeAlong', data);
  }

  public privateChatListener(callback: (data: any) => void) {
    this.socket.on('codeAlong', callback);
  }
}
