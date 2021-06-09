import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { EmploymentType } from '../enums';

export class CreateCompanyDto {
  @ApiProperty()
  @IsString()
  companyName: string;

  @ApiProperty()
  @IsString()
  companyUrl: string;

  @ApiProperty()
  @IsString()
  comment: string;

  @ApiProperty()
  @IsDateString()
  dateStarted: Date;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  dateEnded: Date;

  @ApiProperty()
  @IsString()
  jobTitle: string;

  @ApiProperty()
  @IsEnum(EmploymentType)
  employmentType: EmploymentType;
}
