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
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  GenericPaginatedResponse,
  GenericResponse,
} from '../_shared_/interfaces';
import { PaginatedData } from '../_shared_/interfaces/paginated-data';

@Controller('v1/projects')
@ApiTags('Projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<GenericResponse<Project>> {
    const data = await this.projectService.create(createProjectDto);
    return {
      message: 'Project created',
      data,
    };
  }

  @Get()
  @ApiQuery({ name: 'company_id', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findAll(
    @Query('company_id') companyId?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: number,
  ): Promise<GenericPaginatedResponse<Project>> {
    const data = await this.projectService.findAll(
      {
        limit: limit || 6,
        page: page || 1,
      },
      companyId,
    );
    return {
      message: 'Projects retrieved',
      data,
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<GenericResponse<Project>> {
    const data = await this.projectService.findOne(id);
    return {
      message: 'Project retrieved',
      data,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<GenericResponse<Project>> {
    const data = await this.projectService.update(id, updateProjectDto);
    return {
      message: 'Project updated',
      data,
    };
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<GenericResponse<null>> {
    await this.projectService.remove(id);
    return {
      message: `Project with id ${id} deleted`,
    };
  }
}
