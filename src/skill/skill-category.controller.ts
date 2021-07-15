import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  GenericPaginatedResponse,
  GenericResponse,
} from '../_shared_/interfaces';
import { PaginatedData } from '../_shared_/interfaces/paginated-data';
import { CreateSkillCategoryDto } from './dto/create-skill-category.dto';
import { SkillCategory } from './entities/skill-category.entity';
import { SkillService } from './skill.service';

@Controller('v1/skill-categories')
@ApiTags('Skill Categories')
export class SkillCategoryController {
  constructor(private readonly skillService: SkillService) {}
  @Post()
  async create(
    @Body() createSkillCategoryDto: CreateSkillCategoryDto,
  ): Promise<GenericResponse<SkillCategory>> {
    const data = await this.skillService.createCategory(createSkillCategoryDto);
    return {
      message: 'Skill category created',
      data,
    };
  }

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: number,
  ): Promise<GenericPaginatedResponse<SkillCategory>> {
    const data = await this.skillService.findAllCategories({
      limit: limit || 6,
      page: page || 1,
    });
    return {
      message: 'Skill categories retrieved',
      data,
    };
  }

  @Get('search')
  @ApiQuery({ name: 'q', required: true })
  async searchTutorials(
    @Query('q') keyword?: string,
  ): Promise<GenericResponse<SkillCategory[]>> {
    const data = await this.skillService.searchCategories(keyword);
    return {
      message: 'Tutorial Categories retrieved',
      data,
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<GenericResponse<SkillCategory>> {
    const data = await this.skillService.findSkillCategory(id);
    return {
      message: 'Skill category retrieved',
      data,
    };
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<GenericResponse<null>> {
    await this.skillService.removeCategory(id);
    return {
      message: `Skill category with id ${id} deleted`,
    };
  }
}
