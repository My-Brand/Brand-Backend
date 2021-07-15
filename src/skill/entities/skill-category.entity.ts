import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';
import { Audit } from '../../_shared_/interfaces';
import { Skill } from './skill.entity';

@Entity()
export class SkillCategory extends Audit {
  @Column()
  @ApiProperty()
  title: string;

  @OneToMany(() => Skill, (skill) => skill.category)
  @ApiProperty()
  skills: Skill[];
}
