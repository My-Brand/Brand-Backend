import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill) private readonly skillRepo: Repository<Skill>,
  ) {}
  async create(createSkillDto: CreateSkillDto): Promise<Skill> {
    const newSkill = new Skill();
    newSkill.name = createSkillDto.name;
    newSkill.category = createSkillDto.category;
    newSkill.picture = createSkillDto.picture;
    newSkill.level = createSkillDto.level;
    return await this.skillRepo.save(newSkill);
  }

  async findAll(category?: string): Promise<Skill[]> {
    let skills: Skill[];
    if (!category) skills = await this.skillRepo.find();
    else skills = await this.skillRepo.find({ where: { category } });
    return skills;
  }

  async findOne(id: string): Promise<Skill> {
    const skill = await this.skillRepo.findOne(id);
    if (!skill) throw new NotFoundException('Skill not found');
    return skill;
  }

  async update(id: string, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    const skill = await this.findOne(id);
    if (updateSkillDto.name) skill.name = updateSkillDto.name;
    if (updateSkillDto.category) skill.category = updateSkillDto.category;
    if (updateSkillDto.picture) skill.picture = updateSkillDto.picture;
    if (updateSkillDto.level) skill.level = updateSkillDto.level;
    await this.skillRepo.save(skill);
    return skill;
  }

  async remove(id: string): Promise<void> {
    const skill = await this.findOne(id);
    await this.skillRepo.delete(skill.id);
    return;
  }
}
