import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PostsService } from 'src/posts/posts.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/users/entities/user.entity';
import { UserlessComment } from './entities/comment.entity';

@Controller('api/comments')
@UseGuards(AuthGuard)
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly postsService: PostsService,
  ) {}

  @Get(':postid')
  async findByPost(
    @Param('postid') postid: string,
    @Body('user') user: User,
  ): Promise<UserlessComment[]> {
    const comments = await this.commentsService.findByPost(
      await this.postsService.findOne(+postid),
    );

    return comments.map((comment) =>
      comment.user.id === user.id
        ? { ...comment, user: true }
        : { ...comment, user: false },
    );
  }

  @Post()
  async create(@Body(ValidationPipe) createCommentDto: CreateCommentDto) {
    const post = await this.postsService.findOne(createCommentDto.postid);
    return await this.commentsService.create(
      createCommentDto,
      post,
      createCommentDto.user,
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
