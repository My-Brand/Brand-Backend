import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';
import { Project } from '../../project/entities/project.entity';
import { Audit } from '../../_shared_/interfaces';
import { EmploymentType } from '../enums';

@Entity()
export class Company extends Audit {
  @Column()
  @ApiProperty()
  companyName: string;

  @Column()
  @ApiProperty()
  companyUrl: string;

  @Column()
  @ApiProperty()
  comment: string;

  @Column()
  @ApiProperty()
  dateStarted: Date;

  @Column({ nullable: true })
  @ApiProperty()
  dateEnded: Date;

  @Column()
  @ApiProperty()
  jobTitle: string;

  @Column({ enum: EmploymentType })
  @ApiProperty()
  employmentType: EmploymentType;

  @OneToMany(() => Project, (project) => project.company)
  @ApiProperty()
  projects: Project[];
}
