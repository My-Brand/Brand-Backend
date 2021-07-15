import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Audit } from '../../_shared_/interfaces';
import { Blog } from '.';

@Entity()
export class Comment extends Audit {
  @Column()
  @ApiProperty()
  authorName: string;

  @Column()
  @ApiProperty()
  text: string;

  @ManyToOne(() => Blog, (blog) => blog.comments)
  blog: Blog;
}
