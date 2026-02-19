import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class ListCartsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  command_id?: number;
}
