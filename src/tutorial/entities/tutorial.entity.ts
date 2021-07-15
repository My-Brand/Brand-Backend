import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Audit } from '../../_shared_/interfaces';
import { TutorialCategory } from '.';

@Entity()
export class Tutorial extends Audit {
  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  description: string;

  @Column()
  @ApiProperty()
  sourceCodeUrl: string;

  @Column()
  @ApiProperty()
  url: string;

  @Column()
  @ApiProperty()
  picture: string;

  @ManyToOne(
    () => TutorialCategory,
    (tutorialCategory) => tutorialCategory.tutorials,
  )
  @ApiProperty()
  category: TutorialCategory;
}
