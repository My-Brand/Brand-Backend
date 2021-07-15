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
import { TutorialService } from './tutorial.service';
import { CreateTutorialDto } from './dto/create-tutorial.dto';
import { UpdateTutorialDto } from './dto/update-tutorial.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  GenericPaginatedResponse,
  GenericResponse,
} from '../_shared_/interfaces';
import { Tutorial } from './entities';
import { PaginatedData } from '../_shared_/interfaces/paginated-data';

@Controller('v1/tutorials')
@ApiTags('Tutorials')
export class TutorialController {
  constructor(private readonly tutorialService: TutorialService) {}

  @Post()
  async create(
    @Body() createTutorialDto: CreateTutorialDto,
  ): Promise<GenericResponse<Tutorial>> {
    const data = await this.tutorialService.create(createTutorialDto);
    return {
      message: 'Tutorial created',
      data,
    };
  }

  @Get()
  @ApiQuery({ name: 'category_id', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findAll(
    @Query('category_id') categoryId?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: number,
  ): Promise<GenericPaginatedResponse<Tutorial>> {
    const data = await this.tutorialService.findAll(
      {
        limit: limit || 6,
        page: page || 1,
      },
      categoryId,
    );
    return {
      message: 'Tutorials retrieved',
      data,
    };
  }

  @Get('search')
  @ApiQuery({ name: 'q', required: true })
  async searchTutorials(
    @Query('q') keyword?: string,
  ): Promise<GenericResponse<Tutorial[]>> {
    const data = await this.tutorialService.searchTutorials(keyword);
    return {
      message: 'Tutorials retrieved',
      data,
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<GenericResponse<Tutorial>> {
    const data = await this.tutorialService.findOne(id);
    return {
      message: 'Tutorial retrieved',
      data,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateTutorialDto: UpdateTutorialDto,
  ): Promise<GenericResponse<Tutorial>> {
    const data = await this.tutorialService.update(id, updateTutorialDto);
    return {
      message: 'Tutorial updated',
      data,
    };
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<GenericResponse<null>> {
    await this.tutorialService.remove(id);
    return {
      message: `Tutorial with id ${id} deleted`,
    };
  }
}
