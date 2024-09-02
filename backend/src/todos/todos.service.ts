import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  @InjectRepository(Todo) todoRepository: Repository<Todo>;

  async create(createTodoDto: CreateTodoDto) {
    const newTodo = this.todoRepository.create(createTodoDto);
    const returnedTodo = await this.todoRepository.save(newTodo, {});
    return { ...returnedTodo, user: undefined };
  }

  findAll(userID: number): Promise<Todo[]> {
    console.log('userID:', userID);

    return this.todoRepository.find({
      where: { user: { id: userID } },
      relations: ['user'],
    });
  }

  findOne(id: number, userID: number): Promise<Todo> {
    return this.todoRepository.findOneBy({ id, user: { id: userID } });
  }

  update(id: number, userID: number, updateTodoDto: UpdateTodoDto) {
    return this.todoRepository.update(
      { id, user: { id: userID } },
      updateTodoDto,
    );
  }

  async remove(id: number, userID: number) {
    return (await this.todoRepository.delete({ id, user: { id: userID } }))
      .affected == 0
      ? false
      : true;
  }
}
