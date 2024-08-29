import { IsDefined, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Column, ManyToOne } from 'typeorm';

export class CreatePostDto {
  @Column()
  @IsDefined()
  @IsString()
  title: string;

  @Column()
  @IsDefined()
  @IsString()
  body: string;

  @IsDefined()
  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
