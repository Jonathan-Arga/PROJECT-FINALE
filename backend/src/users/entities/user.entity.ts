import { IsEmail, IsString, Length } from 'class-validator';
import { Comment } from 'src/comments/entities/comment.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Todo } from 'src/todos/entities/todo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @Length(2, 40)
  firstName: string;

  @Column()
  @IsString()
  @Length(2, 40)
  lastName: string;

  @Column()
  @IsString()
  @Length(4, 20)
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @Length(8, 50)
  password: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
