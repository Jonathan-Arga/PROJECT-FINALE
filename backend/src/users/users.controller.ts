import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @UseGuards(AuthGuard)
  getUserByID(@Body('user') user: User) {
    return user.id;
  }
  @Get('all')
  getallUsers() {
    return this.usersService.findAll();
  }
  // @Post()
  // create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body('user') user: User,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    if (user.id !== id) throw new NotFoundException();
    return this.usersService.update(id, updateUserDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Body('user') user: User) {
    if (user.id !== id) throw new NotFoundException();
    return this.usersService.remove(id);
  }
}
