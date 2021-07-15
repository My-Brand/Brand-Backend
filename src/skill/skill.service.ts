import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { UpdateSkillDto, CreateSkillDto, CreateSkillCategoryDto } from './dto';
import { Skill, SkillCategory } from './entities';
import { PaginatedData } from '../_shared_/interfaces/paginated-data';
@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill) private readonly skillRepo: Repository<Skill>,
    @InjectRepository(SkillCategory)
    private readonly categoryRepo: Repository<SkillCategory>,
  ) {}
  async create(createSkillDto: CreateSkillDto): Promise<Skill> {
    const category = await this.findSkillCategory(createSkillDto.categoryId);
    delete createSkillDto.categoryId;
    let newSkill = new Skill();
    newSkill = { ...newSkill, ...createSkillDto, category };
    return await this.skillRepo.save(newSkill);
  }

  async findAll(
    options: IPaginationOptions<any>,
    categoryId?: string,
  ): Promise<PaginatedData<Skill>> {
    let result: PaginatedData<Skill>;
    if (!categoryId) result = await paginate<Skill>(this.skillRepo, options);
    else {
      const category = await this.findSkillCategory(categoryId);
      result = await paginate<Skill>(this.skillRepo, options, {
        where: { category },
      });
    }
    return result;
  }

  async searchSkills(keyword: string): Promise<Skill[]> {
    return await this.skillRepo.find({
      where: { name: ILike(`%${keyword}%`) },
      order: { createdOn: 'DESC' },
    });
  }

  async searchCategories(keyword: string): Promise<SkillCategory[]> {
    return await this.categoryRepo.find({ title: ILike(`%${keyword}%`) });
  }

  async findOne(id: string): Promise<Skill> {
    const skill = await this.skillRepo.findOne(id);
    if (!skill) throw new NotFoundException('Skill not found');
    return skill;
  }

  async update(id: string, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    let skill = await this.findOne(id);
    skill = { ...skill, ...updateSkillDto };
    await this.skillRepo.save(skill);
    return skill;
  }

  async remove(id: string): Promise<void> {
    const skill = await this.findOne(id);
    await this.skillRepo.delete(skill.id);
    return;
  }

  async findSkillCategory(categoryId: string): Promise<SkillCategory> {
    const skillCategory = await this.categoryRepo.findOne(categoryId);
    if (!skillCategory)
      throw new NotFoundException("Skill category doesn't exist");
    return skillCategory;
  }

  async removeCategory(id: string): Promise<null> {
    await this.findSkillCategory(id);
    await this.categoryRepo.delete(id);
    return;
  }
  async findAllCategories(
    options: IPaginationOptions<any>,
  ): Promise<PaginatedData<SkillCategory>> {
    return await paginate<SkillCategory>(this.categoryRepo, options);
  }
  async createCategory(
    createSkillCategoryDto: CreateSkillCategoryDto,
  ): Promise<SkillCategory> {
    let newSkillCategory = new SkillCategory();
    newSkillCategory = { ...newSkillCategory, ...createSkillCategoryDto };
    return await this.skillRepo.save(newSkillCategory);
  }
}
