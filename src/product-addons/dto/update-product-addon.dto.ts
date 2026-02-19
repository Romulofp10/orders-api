import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateProductAddOnDto } from './create-product-addon.dto';

export class UpdateProductAddOnDto extends PartialType(
  OmitType(CreateProductAddOnDto, ['product_id'] as const),
) {}
