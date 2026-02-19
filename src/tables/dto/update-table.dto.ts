import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateTableDto } from './create-table.dto';

export class UpdateTableDto extends PartialType(
  OmitType(CreateTableDto, ['store_id'] as const),
) {}
