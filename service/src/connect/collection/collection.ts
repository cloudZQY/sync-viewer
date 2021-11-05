import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import * as uuid from 'uuid';

@Injectable()
export default class Collection {
  private tokens = new Set<string>();
  private sockets = new Set<Socket>();
  private tokenMap = new Map<string, Socket>();
  private socketMap = new Map<string, string>();
  private roomMap = new Map<string, string>();
  private partnerMap = new Map<string, string>();

  public login(token: string, toToken: string, socket: Socket) {
    this.tokens.add(token);
    this.sockets.add(socket);
    this.tokenMap.set(token, socket);
    this.socketMap.set(socket.id, token);
    const toSocket = this.tokenMap.get(toToken);
    if (toSocket) {
      this.join(token, toToken);
    }
  }

  public logout(token: string, socket: Socket) {
    this.tokens.delete(token);
    this.sockets.delete(socket);
    this.tokenMap.delete(token);
    this.socketMap.delete(socket.id);
    const roomId = this.roomMap.get(token);
    const partner = this.partnerMap.get(token);
    this.roomMap.delete(token);
    this.roomMap.delete(partner);
    const partnerSocket = this.tokenMap.get(partner);
    if (partnerSocket) {
      partnerSocket.emit('disJoin');
    }
    if (roomId) {
      socket.leave(roomId);
      if (partnerSocket) {
        partnerSocket.leave(roomId);
      }
    }
  }

  public getTokenBySocketId(id: string) {
    return this.socketMap.get(id);
  }

  public getSocketByToken(token: string) {
    return this.tokenMap.get(token);
  }

  public join(token: string, toToken: string) {
    const socket = this.getSocketByToken(token);
    const toSocket = this.getSocketByToken(toToken);

    if (socket && toSocket) {
      const roomId = uuid.v4();
      socket.join(roomId);
      toSocket.join(roomId);
      this.roomMap.set(token, roomId);
      this.roomMap.set(toToken, roomId);
      this.partnerMap.set(token, toToken);
      this.partnerMap.set(toToken, token);
      toSocket.emit('join');
      socket.emit('join');

      return true;
    }

    return false;
  }

  sendVideoEvent(videoData: any, token: string, socket: Socket) {
    const roomId = this.roomMap.get(token);

    console.log('video', videoData);

    socket.to(roomId).emit('video', videoData);
  }
}
