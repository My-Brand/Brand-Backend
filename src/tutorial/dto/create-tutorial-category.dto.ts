import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTutorialCategoryDto {
  @ApiProperty()
  @IsString()
  title: string;
}
