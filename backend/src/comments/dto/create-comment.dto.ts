import { IsDefined, IsNumber, IsString } from 'class-validator';
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
  @IsNumber()
  userid: number;
}
