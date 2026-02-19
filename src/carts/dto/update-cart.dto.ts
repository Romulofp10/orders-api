import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-cart.dto';

export class UpdateCartDto extends PartialType(
  OmitType(CreateCartDto, ['command_id'] as const),
) {}
