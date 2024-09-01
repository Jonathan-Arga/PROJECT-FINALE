import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/users/entities/user.entity';

@Controller('todos')
@UseGuards(AuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body(ValidationPipe) createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  findAll(@Body('user') user: User) {
    return this.todosService.findAll(user.id);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Body('user') user: User,
  ) {
    const todo = await this.todosService.findOne(id, user.id);
    if (todo) return todo;
    throw new NotFoundException('Iten not found');
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('user') user: User,
    @Body(ValidationPipe) updateTodoDto: UpdateTodoDto,
  ) {
    const updatedTodo = await this.todosService.update(
      id,
      user.id,
      updateTodoDto,
    );
    if (updatedTodo) return updatedTodo;
    throw new NotFoundException('Iten not found');
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Body('user') user: User,
  ) {
    if (await this.todosService.remove(id, user.id)) return;
    else throw new NotFoundException('item not found');
  }
}
