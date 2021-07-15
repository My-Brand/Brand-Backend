import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from '.';

export class UpdateCommentDto extends PartialType(
  OmitType(CreateCommentDto, ['blogId']),
) {}
