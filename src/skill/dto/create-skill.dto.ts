import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max } from 'class-validator';

export class CreateSkillDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  avatar: string;

  @ApiProperty()
  @IsNumber()
  @Max(5)
  level: number;

  @ApiProperty()
  @IsString()
  categoryId: string;
}
