import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  category: string;

  @Column()
  @ApiProperty()
  picture: string;

  @Column({ type: 'decimal' })
  @ApiProperty()
  level: number;

  @CreateDateColumn()
  @ApiProperty()
  dateCreated: Date;
}
