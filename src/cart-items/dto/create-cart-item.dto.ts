import { IsInt, IsPositive, IsOptional, IsArray, ArrayMinSize } from 'class-validator';

export class CreateCartItemDto {
  @IsInt()
  cart_id: number;

  @IsInt()
  product_id: number;

  @IsInt()
  @IsPositive()
  quantity: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  addon_ids?: number[];
}
