import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { Audit } from '../../_shared_/interfaces';

@Entity()
export class Interest extends Audit {
  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  description: string;

  @Column()
  @ApiProperty()
  picture: string;
}
