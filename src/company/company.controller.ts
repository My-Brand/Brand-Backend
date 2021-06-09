import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GenericResponse } from '../_shared_/interfaces';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Controller('companies')
@ApiTags('Companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(
    @Body() createCompanyDto: CreateCompanyDto,
  ): Promise<GenericResponse<Company>> {
    const data = await this.companyService.create(createCompanyDto);
    return {
      message: 'Company created',
      data,
    };
  }

  @Get()
  async findAll(): Promise<GenericResponse<Company[]>> {
    const data = await this.companyService.findAll();
    return {
      message: 'Companies retrieved',
      data,
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<GenericResponse<Company>> {
    const data = await this.companyService.findOne(id);
    return {
      message: 'Company retrieved',
      data,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<GenericResponse<Company>> {
    const data = await this.companyService.update(id, updateCompanyDto);
    return {
      message: 'Company updated',
      data,
    };
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<GenericResponse<null>> {
    await this.companyService.remove(id);
    return {
      message: `Company with id ${id} deleted`,
    };
  }
}
