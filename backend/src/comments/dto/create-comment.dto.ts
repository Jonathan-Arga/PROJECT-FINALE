import { IsDefined, IsNumber, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Column } from 'typeorm';

export class CreateCommentDto {
  @Column()
  @IsDefined()
  @IsString()
  title: string;

  @Column()
  @IsDefined()
  @IsString()
  body: string;

  @IsDefined()
  @IsNumber()
  postid: number;

  @IsDefined()
  user: User;
}
