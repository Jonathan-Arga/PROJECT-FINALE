import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpException,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoginDto } from './dtos/login.dto';
import { CreateUserDto } from './users/dto/create-user.dto';
import { User } from './users/entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body(ValidationPipe) loginDto: LoginDto) {
    let user: Partial<User>;
    try {
      user = await this.appService.login(loginDto);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
    return user;
  }

  @Post('signup')
  @HttpCode(200)
  async signup(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    try {
      await this.appService.signup(createUserDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
