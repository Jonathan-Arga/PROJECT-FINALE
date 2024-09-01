import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PostsService } from 'src/posts/posts.service';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('comments')
@UseGuards(AuthGuard)
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly postsService: PostsService,
    private readonly usersService: UsersService,
  ) {}

  @Get('post/:postid')
  async findByPost(@Param('postid') postid: string) {
    return await this.commentsService.findByPost(
      await this.postsService.findOne(+postid),
    );
  }
  // use guards below to check if the user is logged in
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    const post = await this.postsService.findOne(createCommentDto.postid);
    return await this.commentsService.create(
      createCommentDto,
      post,
      await this.usersService.findOne(createCommentDto.userid),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return await this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.commentsService.remove(+id);
  }
}
