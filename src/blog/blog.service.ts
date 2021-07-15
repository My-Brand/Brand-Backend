// TASKS LEFT TO DO
// 1. Implement Likes
// 2. Add author to blog

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { PaginatedData } from '../_shared_/interfaces';
import {
  CreateBlogDto,
  CreateCommentDto,
  UpdateBlogDto,
  UpdateCommentDto,
} from './dto';
import { Blog, Comment } from './entities';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepo: Repository<Blog>,
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
  ) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    let newBlog = new Blog();
    newBlog = { ...newBlog, ...createBlogDto };
    return await this.blogRepo.save(newBlog);
  }

  async findAll(
    options: IPaginationOptions<any>,
  ): Promise<PaginatedData<Blog>> {
    return await paginate<Blog>(this.blogRepo, options, {
      order: { createdOn: 'DESC' },
    });
  }

  async searchBlogs(
    keyword: string,
    options: IPaginationOptions<any>,
  ): Promise<PaginatedData<Blog>> {
    return await paginate<Blog>(this.blogRepo, options, {
      where: { title: ILike(`%${keyword}%`) },
      order: { createdOn: 'DESC' },
    });
  }

  async findBlogWithComments(id: string): Promise<Blog> {
    const blog = await this.blogRepo.findOne({
      where: { id },
      relations: ['comments'],
    });
    if (!blog) throw new NotFoundException('Blog not found');
    return blog;
  }

  async findOne(id: string): Promise<Blog> {
    const blog = await this.blogRepo.findOne(id);
    if (!blog) throw new NotFoundException('Blog not found');
    return blog;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    let blog = await this.findOne(id);
    blog = { ...blog, ...updateBlogDto };
    return await this.blogRepo.save(blog);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.blogRepo.delete(id);
    return;
  }

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const blog = await this.findOne(createCommentDto.blogId);
    delete createCommentDto.blogId;
    let newComment = new Comment();
    newComment = { ...newComment, ...createCommentDto, blog };
    const result = await this.commentRepo.save(newComment);
    blog.commentsCount = await this.commentRepo.count({ where: { blog } });
    await this.blogRepo.save(blog);
    return result;
  }

  async removeComment(id: string): Promise<void> {
    const comment = await this.findOneComment(id);
    await this.commentRepo.delete(id);
    await this.blogRepo.update(
      { id: comment.blog.id },
      {
        commentsCount: await this.commentRepo.count({
          where: { blog: comment.blog.id },
        }),
      },
    );
    return;
  }
  async updateComment(
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    let comment = await this.findOneComment(id);
    comment = { ...comment, ...updateCommentDto };
    return await this.commentRepo.save(comment);
  }
  async findOneComment(id: string): Promise<Comment> {
    const comment = await this.commentRepo.findOne({
      where: { id },
      relations: ['blog'],
    });
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }
  async findComments(
    blogId: string,
    options: IPaginationOptions<any>,
  ): Promise<PaginatedData<Comment>> {
    const blog = await this.findOne(blogId);
    return await paginate<Comment>(this.commentRepo, options, {
      where: { blog },
      order: { createdOn: 'DESC' },
    });
  }
}
