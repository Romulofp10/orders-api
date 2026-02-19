import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class ListCommandsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  table_id?: number;
}
