import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UsersService } from 'src/users/users.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll() {
    return await this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.postsService.findOne(+id);
  }
  // use guards below to check if the user is logged in
  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    if (!createPostDto.title || !createPostDto.body)
      return new HttpException(
        'Invalid Arguments',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return await this.postsService.create(createPostDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return await this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.postsService.remove(+id);
  }
}
