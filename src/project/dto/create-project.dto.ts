import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsDateString,
  ArrayMinSize,
  IsBoolean,
  IsNumberString,
  ValidateIf,
} from 'class-validator';

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsBoolean()
  personal: boolean;

  @ApiProperty()
  @IsDateString()
  dateStarted: Date;

  @ApiProperty()
  @ArrayMinSize(3, {
    message: 'A project must have at least 3 pictures',
  })
  pictures: Set<string>;

  @ApiProperty()
  @ArrayMinSize(1, {
    message: 'A project must have at least 1 technology',
  })
  technologies: Set<string>;

  @ApiProperty()
  @ValidateIf((thisObj) => !thisObj.personal)
  @IsNumberString()
  companyId: string;
}
