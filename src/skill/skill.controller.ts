import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { GenericResponse } from '../_shared_/interfaces';
import { Skill } from './entities/skill.entity';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('v1/skills')
@ApiTags('Skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post()
  async create(
    @Body() createSkillDto: CreateSkillDto,
  ): Promise<GenericResponse<Skill>> {
    const data = await this.skillService.create(createSkillDto);
    return {
      message: 'Skill created',
      data,
    };
  }

  @Get()
  @ApiQuery({ name: 'category', required: false })
  async findAll(
    @Query('category') category?: string,
  ): Promise<GenericResponse<Skill[]>> {
    const data = await this.skillService.findAll(category);
    return {
      message: 'Skills retrieved',
      data,
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<GenericResponse<Skill>> {
    const data = await this.skillService.findOne(id);
    return {
      message: 'Skill retrieved',
      data,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateSkillDto: UpdateSkillDto,
  ): Promise<GenericResponse<Skill>> {
    const data = await this.skillService.update(id, updateSkillDto);
    return {
      message: 'Skill updated',
      data,
    };
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<GenericResponse<null>> {
    await this.skillService.remove(id);
    return {
      message: `Skill with id ${id} deleted`,
    };
  }
}
