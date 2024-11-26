import React from 'react';
import { Socket } from 'socket.io-client';

export class CodingProjectSocket {
  private socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  public joinCodingProject(codingProjectId: string, groupId: string) {
    this.socket.emit('joinCodingProject', { codingProjectId, groupId });
  }

  public codeAlongEmitter(
    groupId: string,
    codingProjectId: string,
    userId: string,
    value: React.SetStateAction<string>,
  ) {
    this.socket.emit('codeAlong', { groupId, codingProjectId, userId, value });
  }

  public codeAlongListener(callback: (data: any) => void) {
    this.socket.on('codeAlong', callback);
  }
}
