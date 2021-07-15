import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { UpdateSkillDto, CreateSkillDto, CreateSkillCategoryDto } from './dto';
import { Skill, SkillCategory } from './entities';
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

  async findAll(category?: string): Promise<Skill[]> {
    let skills: Skill[];
    if (!category) skills = await this.skillRepo.find();
    else skills = await this.skillRepo.find({ where: { category } });
    return skills;
  }

  async searchSkills(keyword: string): Promise<Skill[]> {
    return await this.skillRepo.find({ name: ILike(`%${keyword}%`) });
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
    if (updateSkillDto.categoryId) {
      const category = await this.categoryRepo.findOne(
        updateSkillDto.categoryId,
      );
      skill.category = category;
      delete updateSkillDto.categoryId;
    }
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
  async findAllCategories(): Promise<SkillCategory[]> {
    return await this.categoryRepo.find();
  }
  async createCategory(
    createSkillCategoryDto: CreateSkillCategoryDto,
  ): Promise<SkillCategory> {
    let newSkillCategory = new SkillCategory();
    newSkillCategory = { ...newSkillCategory, ...createSkillCategoryDto };
    return await this.skillRepo.save(newSkillCategory);
  }
}
