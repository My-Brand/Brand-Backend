import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';
import { Tutorial } from '.';
import { Audit } from '../../_shared_/interfaces';

@Entity()
export class TutorialCategory extends Audit {
  @Column()
  @ApiProperty()
  title: string;

  @OneToMany(() => Tutorial, (tutorial) => tutorial.category)
  @ApiProperty()
  tutorials: Tutorial[];
}
