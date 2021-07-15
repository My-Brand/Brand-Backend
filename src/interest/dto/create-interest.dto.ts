import { ApiProperty } from '@nestjs/swagger';

export class CreateInterestDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  picture: string;
}
