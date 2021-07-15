import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { SkillCategory } from './entities/skill-category.entity';
import { SkillCategoryController } from './skill-category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Skill, SkillCategory])],
  controllers: [SkillController, SkillCategoryController],
  providers: [SkillService],
})
export class SkillModule {}
