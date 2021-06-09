import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EmploymentType } from '../enums';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: string;

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

  @CreateDateColumn()
  dateCreated: Date;
}
