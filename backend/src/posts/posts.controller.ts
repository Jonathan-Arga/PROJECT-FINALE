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

@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll() {
    return await this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.postsService.findOne(id);
  }
  // use guards below to check if the user is logged in
  @Post()
  async create(@Body(ValidationPipe) createPostDto: CreatePostDto) {
    if (!createPostDto.title || !createPostDto.body)
      return new HttpException(
        'Invalid Arguments',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return await this.postsService.create(createPostDto);
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
