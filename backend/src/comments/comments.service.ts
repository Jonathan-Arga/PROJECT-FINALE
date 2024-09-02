import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
  ) {}
  async create(createCommentDto: CreateCommentDto, post: Post, user: User) {
    const createdComment = this.commentsRepository.create({
      ...createCommentDto,
      post,
      user,
    });
    const savedComment = await this.commentsRepository.save(createdComment);
    return { ...savedComment, user: undefined };
  }

  async findAll() {
    return await this.commentsRepository.find();
  }

  async findOne(id: number) {
    return await this.commentsRepository.findOne({ where: { id } });
  }
  async findByUser(user: User) {
    return await this.commentsRepository.find({ where: { user } });
  }
  async findByPost(post: Post) {
    return await this.commentsRepository.find({
      where: { post },
      relations: ['user'],
    });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return await this.commentsRepository.update({ id }, updateCommentDto);
  }

  async remove(id: number) {
    return await this.commentsRepository.delete({ id });
  }
}
