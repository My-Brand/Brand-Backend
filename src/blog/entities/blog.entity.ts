import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';
import { Audit } from '../../_shared_/interfaces';
import { Comment } from '.';

@Entity()
export class Blog extends Audit {
  @Column()
  @ApiProperty()
  title: string;

  @Column({ nullable: true })
  @ApiProperty()
  snippet: string;

  @Column()
  @ApiProperty()
  content: string;

  @Column()
  @ApiProperty()
  picture: string;

  @Column({ default: 0 })
  @ApiProperty()
  likesCount: number;

  @Column({ default: 0 })
  @ApiProperty()
  commentsCount: number;

  @OneToMany(() => Comment, (comment) => comment.blog)
  comments: Comment[];
}
