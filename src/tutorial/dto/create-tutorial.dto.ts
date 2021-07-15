import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTutorialDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  sourceCodeUrl: string;

  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty()
  @IsString()
  picture: string;

  @ApiProperty()
  @IsString()
  categoryId: string;
}
