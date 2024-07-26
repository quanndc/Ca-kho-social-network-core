import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Headers } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async verifyToken(@Headers('authorization') idToken: string) {
    console.log(idToken);
    const user = await this.authService.verifyToken(idToken);
    return user;
  }
}
