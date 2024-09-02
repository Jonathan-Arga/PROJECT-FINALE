import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/users/entities/user.entity';

@Controller('api/posts')
@UseGuards(AuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll() {
    return await this.postsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Body('user') user: User,
  ) {
    const post = await this.postsService.findOne(id);

    return { ...post, user: post.user.id === user.id };
  }
  @Post()
  async create(@Body(ValidationPipe) createPostDto: CreatePostDto) {
    if (!createPostDto.title || !createPostDto.body)
      return new HttpException(
        'Invalid Arguments',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    try {
      console.log(createPostDto);

      return await this.postsService.create(createPostDto);
    } catch (err) {
      throw err;
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updatePostDto: UpdatePostDto,
  ) {
    return await this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.postsService.remove(id);
  }
}
