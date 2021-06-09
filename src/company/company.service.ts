import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const newCompany = new Company();
    newCompany.companyName = createCompanyDto.companyName;
    newCompany.companyUrl = createCompanyDto.companyUrl;
    newCompany.comment = createCompanyDto.comment;
    newCompany.jobTitle = createCompanyDto.jobTitle;
    newCompany.employmentType = createCompanyDto.employmentType;
    newCompany.dateStarted = createCompanyDto.dateStarted;
    newCompany.dateEnded = createCompanyDto.dateEnded;
    return await this.companyRepo.save(newCompany);
  }

  async findAll(): Promise<Company[]> {
    return await this.companyRepo.find();
  }

  async findOne(id: string): Promise<Company> {
    const company = await this.companyRepo.findOne(id);
    if (!company) throw new NotFoundException('Company not found');
    return company;
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const company = await this.findOne(id);
    if (updateCompanyDto.companyName)
      company.companyName = updateCompanyDto.companyName;
    if (updateCompanyDto.companyUrl)
      company.companyUrl = updateCompanyDto.companyUrl;
    if (updateCompanyDto.comment) company.comment = updateCompanyDto.comment;
    if (updateCompanyDto.jobTitle) company.jobTitle = updateCompanyDto.jobTitle;
    if (updateCompanyDto.employmentType)
      company.employmentType = updateCompanyDto.employmentType;
    if (updateCompanyDto.dateStarted)
      company.dateStarted = updateCompanyDto.dateStarted;
    if (updateCompanyDto.dateEnded)
      company.dateEnded = updateCompanyDto.dateEnded;
    return await this.companyRepo.save(company);
  }

  async remove(id: string): Promise<void> {
    const company = await this.findOne(id);
    await this.companyRepo.delete(company.id);
    return;
  }
}
