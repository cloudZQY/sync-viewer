import { Module } from '@nestjs/common';
import Collection from './collection/collection';
import { ConnectController } from './connect.controller';
import { ConnectGateway } from './connect.gateway';
import { ConnectService } from './connect.service';

@Module({
  controllers: [ConnectController],
  providers: [ConnectService, ConnectGateway, Collection],
})
export class ConnectModule {}
