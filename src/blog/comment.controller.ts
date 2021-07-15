import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import {
  GenericResponse,
  GenericPaginatedResponse,
} from '../_shared_/interfaces';
import { BlogService } from './blog.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { Comment } from './entities';

@Controller('v1/blog/comments')
export class CommentController {
  constructor(private readonly blogService: BlogService) {}
  @Post()
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<GenericResponse<Comment>> {
    const data = await this.blogService.createComment(createCommentDto);
    return {
      message: 'Comment created',
      data,
    };
  }

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findCommentComments(
    @Query('blog_id', ParseIntPipe) blogId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: number,
  ): Promise<GenericPaginatedResponse<Comment>> {
    const data = await this.blogService.findComments(blogId, {
      limit: limit || 6,
      page: page || 1,
    });
    return {
      message: 'Comments retrieved',
      data,
    };
  }

  @Get(':id')
  async findOneComment(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<GenericResponse<Comment>> {
    const data = await this.blogService.findOneComment(id);
    return {
      message: 'Comment retrieved',
      data,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<GenericResponse<Comment>> {
    const data = await this.blogService.updateComment(id, updateCommentDto);
    return {
      message: 'Comment retrieved',
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<GenericResponse<null>> {
    await this.blogService.removeComment(id);
    return {
      message: `Comment with id ${id} deleted`,
    };
  }
}
