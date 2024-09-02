import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    if (!createPostDto.title || !createPostDto.body)
      throw new HttpException(
        'Invalid Arguments',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    const createdPost = this.postsRepository.create(createPostDto);
    const savedPost = await this.postsRepository.save(createdPost);

    return { ...savedPost, user: undefined };
  }

  async findAll() {
    return await this.postsRepository.find();
  }

  async findOne(id: number) {
    return await this.postsRepository.findOne({
      where: { id },
      relations: ['comments'],
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.postsRepository.update({ id }, updatePostDto);
  }

  remove(id: number) {
    return this.postsRepository.delete({ id });
  }
}
