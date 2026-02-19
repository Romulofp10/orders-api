import { IsInt, IsPositive } from 'class-validator';

export class CreateTableDto {
  @IsInt()
  store_id: number;

  @IsInt()
  @IsPositive()
  number: number;
}
