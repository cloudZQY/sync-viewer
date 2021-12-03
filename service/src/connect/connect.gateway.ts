import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import Collection from './collection/collection';
import { JoinDto } from './dto/join.dto';
import { LoginDto } from './dto/login.dto';

@WebSocketGateway({
  namespace: 'socket',
  cors: {
    origin: '*',
  },
})
export class ConnectGateway {
  constructor(private readonly collection: Collection) {}
  @SubscribeMessage('join')
  handleEvent(@MessageBody() data: JoinDto, @ConnectedSocket() socket: Socket) {
    const token: string = socket.handshake.auth.token;
    const toToken = data.toToken;

    const res = this.collection.join(token, toToken);

    return {
      result: res ? 'success' : 'fail',
    };
  }

  @SubscribeMessage('video')
  handleVideo(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    const token: string = socket.handshake.auth.token;

    this.collection.sendVideoEvent(data, token, socket);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    const token: string = socket.handshake.auth.token;

    this.collection.sendMessage(data, token, socket);
  }

  handleConnection(socket: Socket) {
    const token: string = socket.handshake.auth.token;
    const toToken: string = socket.handshake.query.toToken as string;

    if (!token) {
      socket.disconnect();
      return;
    }

    this.collection.login(token, toToken, socket);
  }

  handleDisconnect(socket: Socket) {
    const token: string = socket.handshake.auth.token;

    this.collection.logout(token, socket);
  }
}
