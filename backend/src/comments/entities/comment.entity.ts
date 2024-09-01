import { IsDefined, IsString } from 'class-validator';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsDefined()
  @IsString()
  title: string;

  @Column()
  @IsDefined()
  @IsString()
  body: string;

  @IsDefined()
  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn()
  post: Post;

  @IsDefined()
  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn()
  user: User;
}
