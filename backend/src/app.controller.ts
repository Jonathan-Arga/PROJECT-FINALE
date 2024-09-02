import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginDto } from './dtos/login.dto';
import { CreateUserDto } from './users/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  async login(@Body(ValidationPipe) loginDto: LoginDto) {
    try {
      const token = await this.appService.login(loginDto);
      return { token };
    } catch (error) {
      throw error;
    }
  }

  @Post('signup')
  async signup(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    console.log('signup');
    try {
      const token = await this.appService.signup(createUserDto);
      console.log('Token:' + token);

      return { token };
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
}
