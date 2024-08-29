import { IsDefined, IsString } from 'class-validator';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  @OneToMany(() => Post, (post) => post.comments)
  post: Post;

  @IsDefined()
  @ManyToOne(() => User, (user) => user.comments)
  user: User;
}
