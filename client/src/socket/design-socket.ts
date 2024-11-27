import React from 'react';
import { Socket } from 'socket.io-client';

export class DesignSocket {
  private socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  public designAlongEmitter(
    groupId: string,
    codingProjectId: string,
    userId: string,
    value: React.SetStateAction<string>,
  ) {
    this.socket.emit('codeAlong', { groupId, codingProjectId, userId, value });
  }

  public designAlongListener(callback: (data: any) => void) {
    this.socket.on('codeAlong', callback);
  }
}
