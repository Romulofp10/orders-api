import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class ListTablesDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  store_id?: number;
}
