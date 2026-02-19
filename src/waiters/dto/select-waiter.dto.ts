import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class SelectWaiterDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  store_id?: number;
}
