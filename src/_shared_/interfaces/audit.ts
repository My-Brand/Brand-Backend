import { ApiProperty } from '@nestjs/swagger';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Audit {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: string;

  @Column()
  @CreateDateColumn()
  createdOn: Date;

  @Column()
  @UpdateDateColumn()
  lastUpdatedOn: Date;
}
