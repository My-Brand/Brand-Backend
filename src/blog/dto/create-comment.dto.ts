import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  authorName: string;

  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsNumberString()
  blogId: string;
}
