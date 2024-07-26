import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { FirebaseAdmin, InjectFirebaseAdmin } from "nestjs-firebase";

@Controller()
export class AppController {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
    private readonly appService: AppService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
