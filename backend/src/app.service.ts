import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { LoginDto } from './dtos/login.dto';
import { CreateUserDto } from './users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOneByUsername(loginDto.username);

    if (!user || !user.password || !user.username)
      throw new HttpException('Invalid credentials', 401);

    if (!(await bcrypt.compare(loginDto.password, user.password)))
      throw new HttpException('Invalid credential', 401);

    return this.jwtService.signAsync({ sub: user.id, username: user.username });
  }

  async signup(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.usersService.create(createUserDto);

    return this.jwtService.signAsync({
      sub: newUser.id,
      username: newUser.username,
    });
  }
}
