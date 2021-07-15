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
import { CreateTutorialCategoryDto } from '../tutorial/dto';
import { GenericResponse } from '../_shared_/interfaces';
import { TutorialCategory } from './entities';
import { TutorialService } from './tutorial.service';

@Controller('v1/tutorial-categories')
@ApiTags('Tutorial Categories')
export class TutorialCategoryController {
  constructor(private readonly tutorialService: TutorialService) {}
  @Post()
  async create(
    @Body() createTutorialCategoryDto: CreateTutorialCategoryDto,
  ): Promise<GenericResponse<TutorialCategory>> {
    const data = await this.tutorialService.createCategory(
      createTutorialCategoryDto,
    );
    return {
      message: 'Tutorial category created',
      data,
    };
  }

  @Get()
  async findAll(): Promise<GenericResponse<TutorialCategory[]>> {
    const data = await this.tutorialService.findAllCategories();
    return {
      message: 'Tutorial categories retrieved',
      data,
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<GenericResponse<TutorialCategory>> {
    const data = await this.tutorialService.findTutorialCategory(id);
    return {
      message: 'Tutorial category retrieved',
      data,
    };
  }

  @Get('search')
  @ApiQuery({ name: 'q', required: true })
  async searchTutorials(
    @Query('q') keyword?: string,
  ): Promise<GenericResponse<TutorialCategory[]>> {
    const data = await this.tutorialService.searchCategories(keyword);
    return {
      message: 'Tutorial Categories retrieved',
      data,
    };
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<GenericResponse<null>> {
    await this.tutorialService.removeCategory(id);
    return {
      message: `Tutorial category with id ${id} deleted`,
    };
  }
}
