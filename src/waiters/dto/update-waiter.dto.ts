import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateWaiterDto } from './create-waiter.dto';

export class UpdateWaiterDto extends PartialType(
  OmitType(CreateWaiterDto, ['store_id'] as const),
) {}
