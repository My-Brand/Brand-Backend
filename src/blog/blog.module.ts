import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog, Comment } from './entities';
import { CommentController } from './comment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, Comment])],
  controllers: [BlogController, CommentController],
  providers: [BlogService],
})
export class BlogModule {}
