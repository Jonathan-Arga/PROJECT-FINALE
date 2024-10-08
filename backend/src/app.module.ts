import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Todo } from './todos/entities/todo.entity';
import { Post } from './posts/entities/post.entity';
import { Comment } from './comments/entities/comment.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    TodosModule,
    PostsModule,
    CommentsModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'z10mz10m',
      database: 'projectDB',
      entities: [User, Todo, Post, Comment],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'public'),
    }),
    JwtModule.register({
      secret: process.env.SECRET || 'secret',
      signOptions: { expiresIn: '1d' },
      global: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
