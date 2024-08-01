import { Injectable } from '@nestjs/common';
import {SnowflakeId} from '@akashrajpurohit/snowflake-id'
@Injectable()
export class IdgenService {
  private snowflake = null;
  constructor() {
    this.snowflake = SnowflakeId({
      workerId: 1,
      epoch: 1722344820000,
    });
  }

  generateId() {
    return this.snowflake.generate();
  }

}
