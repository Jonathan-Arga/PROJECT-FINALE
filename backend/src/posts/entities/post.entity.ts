import { User } from 'src/users/entities/user.entity';
import { ManyToOne } from 'typeorm';

export class Post {
  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
