import {
  Body,
  Controller,
  HttpCode,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoginDto } from './dtos/login.dto';
import { CreateUserDto } from './users/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body(ValidationPipe) loginDto: LoginDto) {
    try {
      return await this.appService.login(loginDto);
    } catch (error) {
      throw error;
    }
  }

  @Post('signup')
  @HttpCode(200)
  async signup(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    try {
      return await this.appService.signup(createUserDto);
    } catch (error) {
      throw error;
    }
  }
}
