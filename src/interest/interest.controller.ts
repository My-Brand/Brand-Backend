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
import { InterestService } from './interest.service';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';
import {
  GenericPaginatedResponse,
  GenericResponse,
} from '../_shared_/interfaces';
import { Interest } from './entities';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('v1/interests')
@ApiTags('Interests')
export class InterestController {
  constructor(private readonly interestService: InterestService) {}

  @Post()
  async create(
    @Body() createInterestDto: CreateInterestDto,
  ): Promise<GenericResponse<Interest>> {
    const data = await this.interestService.create(createInterestDto);
    return {
      message: 'Interest created',
      data,
    };
  }

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: number,
  ): Promise<GenericPaginatedResponse<Interest>> {
    const data = await this.interestService.findAll({
      limit: limit || 6,
      page: page || 1,
    });
    return {
      message: 'Interests retrieved',
      data,
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<GenericResponse<Interest>> {
    const data = await this.interestService.findOne(id);
    return {
      message: 'Interest retrieved',
      data,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInterestDto: UpdateInterestDto,
  ): Promise<GenericResponse<Interest>> {
    const data = await this.interestService.update(id, updateInterestDto);
    return {
      message: 'Interest retrieved',
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<GenericResponse<null>> {
    await this.interestService.remove(id);
    return {
      message: `Interest with id ${id} deleted`,
    };
  }
}
