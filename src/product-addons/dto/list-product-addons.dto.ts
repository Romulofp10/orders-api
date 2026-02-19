import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class ListProductAddOnsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  product_id?: number;
}
