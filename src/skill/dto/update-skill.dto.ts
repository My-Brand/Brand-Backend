import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';
import { CreateSkillDto } from './create-skill.dto';

export class UpdateSkillDto extends PartialType(CreateSkillDto) {
  @ApiProperty()
  @IsNumberString()
  @IsOptional()
  categoryId: string;
}
