import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateTodoDto {
  @IsString()
  name: string;

  @IsBoolean()
  @IsOptional()
  checked: boolean;

  user: User;
}
