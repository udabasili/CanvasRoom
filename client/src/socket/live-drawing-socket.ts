import { Socket } from 'socket.io-client';

type LiveDrawingData = {
  groupId: string;
  channelId: string;
  userId: string;
  stroke: {
    color: string;
    width: number;
    points: [{ x: number; y: number }];
  };
};

export class LiveDrawingSocket {
  private socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  public liveDrawingEmitter({ input }: { input: LiveDrawingData }) {
    this.socket.emit('live-drawing', input);
  }

  public liveDrawingListener(callback: (data: any) => void) {
    this.socket.on('live-drawing', callback);
  }

  public liveDrawingRemoveListener() {
    this.socket.off('live-drawing');
  }
}
