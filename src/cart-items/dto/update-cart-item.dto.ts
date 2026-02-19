import { IsInt, IsPositive, IsOptional, IsArray } from 'class-validator';

export class UpdateCartItemDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  quantity?: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  addon_ids?: number[];
}
