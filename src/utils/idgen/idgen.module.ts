import { Module } from '@nestjs/common';
import { IdgenService } from "./idgen.service";

@Module({
  providers: [IdgenService ],
  exports: [IdgenService]})
export class IdgenModule {}
