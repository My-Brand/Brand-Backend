import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import {
  GenericPaginatedResponse,
  GenericResponse,
} from '../_shared_/interfaces';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities';

@Controller('v1/blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  async create(
    @Body() createBlogDto: CreateBlogDto,
  ): Promise<GenericResponse<Blog>> {
    const data = await this.blogService.create(createBlogDto);
    return {
      message: 'Blog created',
      data,
    };
  }

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: number,
  ): Promise<GenericPaginatedResponse<Blog>> {
    const data = await this.blogService.findAll({
      limit: limit || 6,
      page: page || 1,
    });
    return {
      message: 'Blogs retrieved',
      data,
    };
  }

  @Get('search')
  @ApiQuery({ name: 'q', required: true })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async searchTutorials(
    @Query('q') keyword?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: number,
  ): Promise<GenericPaginatedResponse<Blog>> {
    const data = await this.blogService.searchBlogs(keyword, {
      limit: limit || 6,
      page: page || 1,
    });
    return {
      message: 'Blogs retrieved',
      data,
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<GenericResponse<Blog>> {
    const data = await this.blogService.findBlogWithComments(id);
    return {
      message: 'Blog retrieved',
      data,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
  ): Promise<GenericResponse<Blog>> {
    const data = await this.blogService.update(id, updateBlogDto);
    return {
      message: 'Blog retrieved',
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<GenericResponse<null>> {
    await this.blogService.remove(id);
    return {
      message: `Blog with id ${id} deleted`,
    };
  }
}
