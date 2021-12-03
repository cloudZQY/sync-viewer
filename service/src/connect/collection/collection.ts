import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import * as uuid from 'uuid';

@Injectable()
export default class Collection {
  private tokens = new Set<string>();
  private sockets = new Set<Socket>();
  private tokenMap = new Map<string, Socket>();
  private socketMap = new Map<string, string>();
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
    const partner = this.partnerMap.get(token);
    const partnerSocket = this.tokenMap.get(partner);
    if (partnerSocket) {
      partnerSocket.emit('disJoin');
    }
  }

  public getTokenBySocketId(id: string) {
    return this.socketMap.get(id);
  }

  public getSocketByToken(token: string) {
    return this.tokenMap.get(token);
  }

  public sendMessage(data: any, token: string, socket: Socket) {
    const parter = this.partnerMap.get(token);
    const parterSocket = this.tokenMap.get(parter);

    parterSocket.emit('message', data);
  }

  public join(token: string, toToken: string) {
    const socket = this.getSocketByToken(token);
    const toSocket = this.getSocketByToken(toToken);

    if (socket && toSocket) {
      const roomId = uuid.v4();
      socket.join(roomId);
      toSocket.join(roomId);
      this.partnerMap.set(token, toToken);
      this.partnerMap.set(toToken, token);
      toSocket.emit('join', {
        partner: token
      });
      socket.emit('join', {
        partner: toToken
      });

      return true;
    }

    return false;
  }

  sendVideoEvent(videoData: any, token: string, socket: Socket) {
    const parter = this.partnerMap.get(token);
    const parterSocket = this.tokenMap.get(parter);

    parterSocket.emit('video', videoData);
  }
}
