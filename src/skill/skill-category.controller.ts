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
import { GenericResponse } from '../_shared_/interfaces';
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
  async findAll(): Promise<GenericResponse<SkillCategory[]>> {
    const data = await this.skillService.findAllCategories();
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
