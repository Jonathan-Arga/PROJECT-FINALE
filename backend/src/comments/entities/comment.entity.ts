import { User } from 'src/users/entities/user.entity';
import { ManyToOne } from 'typeorm';

export class Comment {
  @ManyToOne(() => User, (user) => user.comments)
  user: User;
}
