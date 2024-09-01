import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users/users.service';
import { LoginDto } from './dtos/login.dto';
import { CreateUserDto } from './users/dto/create-user.dto';

@Injectable()
export class AppService {
  constructor(private usersService: UsersService) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOneByUsername(loginDto.username);
    if (user?.password !== loginDto.password) throw new Error("Can't log in");
    const { password, ...userWOPassword } = user;
    return userWOPassword;
  }

  async signup(createUserDto: CreateUserDto) {
    const user = await this.usersService.findOneByUsername(
      createUserDto.username,
    );
    if (user) throw new Error('Username already exists');
    return this.usersService.create(createUserDto);
  }
}
