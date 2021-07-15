import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Audit } from '../../_shared_/interfaces';
import { SkillCategory } from './skill-category.entity';

@Entity()
export class Skill extends Audit {
  @Column()
  @ApiProperty()
  name: string;

  @ManyToOne(() => SkillCategory, (skillCategory) => skillCategory.skills)
  @ApiProperty()
  category: SkillCategory;

  @Column()
  @ApiProperty()
  avatar: string;

  @Column({ type: 'decimal' })
  @ApiProperty()
  level: number;
}
