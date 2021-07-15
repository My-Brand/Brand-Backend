import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from '../../company/entities/company.entity';
import { Audit } from '../../_shared_/interfaces';

@Entity()
export class Project extends Audit {
  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  description: string;

  @Column()
  @ApiProperty()
  type: string;

  @Column()
  @ApiProperty()
  url: string;

  @Column()
  @ApiProperty()
  personal: boolean;

  @Column()
  @ApiProperty()
  dateStarted: Date;

  @ApiProperty()
  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
  })
  pictures: Set<string>;

  @ApiProperty()
  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
  })
  technologies: Set<string>;

  @ManyToOne(() => Company, (company) => company.projects)
  @ApiProperty()
  company: Company;
}
