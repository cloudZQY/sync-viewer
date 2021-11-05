import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import Collection from './collection/collection';
import { JoinDto } from './dto/join.dto';

@Injectable()
export class ConnectService {
  constructor(private readonly collection: Collection) {}

  getToken() {
    return uuid.v4().replace(/-/g, '').slice(0, 10);
  }

  join(data: JoinDto) {
    const res = this.collection.join(data.token, data.toToken);

    return {
      result: res ? 'success' : 'fail',
    };
  }
}
