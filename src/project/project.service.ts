import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../company/entities/company.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
  ) {}
  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    let newProject = new Project();
    if (createProjectDto.companyId) {
      const company = await this.findCompany(createProjectDto.companyId);
      newProject.company = company;
      delete createProjectDto.companyId;
    }
    newProject = { ...newProject, ...createProjectDto };
    return await this.projectRepo.save(newProject);
  }

  async findAll(companyId?: string): Promise<Project[]> {
    const company = await this.findCompany(companyId);
    let projects: Project[];
    if (!companyId) projects = await this.projectRepo.find();
    else projects = await this.projectRepo.find({ where: { company } });
    return projects;
  }
  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepo.findOne(id);
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    let project = await this.findOne(id);
    if (updateProjectDto.companyId) {
      const company = await this.findCompany(updateProjectDto.companyId);
      project.company = company;
      delete updateProjectDto.companyId;
    }
    project = { ...project, ...updateProjectDto };
    await this.projectRepo.save(project);
    return project;
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.projectRepo.delete(id);
    return;
  }

  async findCompany(companyId: string): Promise<Company> {
    const company = await this.companyRepo.findOne(companyId);
    if (!company) throw new NotFoundException("Company doesn't exist");
    return company;
  }
}
