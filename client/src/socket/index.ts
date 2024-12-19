import { io, Socket } from 'socket.io-client';

import config from '@/config';

class MainChat {
  private socket: Socket;

  constructor() {
    this.socket = io(config.apiUrl, {
      reconnectionAttempts: 5, // Limit reconnection attempts
      reconnectionDelay: 2000, // Reconnect every 2 seconds
    });

    //connect to the socket server
    this.socket.connect();
  }

  public sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  public onMessage(callback: (message: string) => void): void {
    this.socket.on('message', callback);
  }
}

export default MainChat;
