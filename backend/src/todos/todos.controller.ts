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
@Controller('todos')
@UseGuards(AuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body(ValidationPipe) createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  findAll(@Body('userID') userID: number) {
    return this.todosService.findAll(userID);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Body('userID') userID: number,
  ) {
    const todo = await this.todosService.findOne(id, userID);
    if (todo) return todo;
    throw new NotFoundException('Iten not found');
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('userID') userID: number,
    @Body(ValidationPipe) updateTodoDto: UpdateTodoDto,
  ) {
    const updatedTodo = await this.todosService.update(
      id,
      userID,
      updateTodoDto,
    );
    if (updatedTodo) return updatedTodo;
    throw new NotFoundException('Iten not found');
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Body('userID') userID: number,
  ) {
    if (await this.todosService.remove(id, userID)) return;
    else throw new NotFoundException('item not found');
  }
}
