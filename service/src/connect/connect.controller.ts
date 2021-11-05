import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConnectService } from './connect.service';
import { JoinDto } from './dto/join.dto';

@Controller('connect')
export class ConnectController {
  constructor(private readonly connectService: ConnectService) {}

  @Get('/get-token')
  getToken() {
    return {
      token: this.connectService.getToken(),
    };
  }

  @Post('/join')
  join(@Body() data: JoinDto) {
    return this.connectService.join(data);
  }
}
