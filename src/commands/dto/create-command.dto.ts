import { IsInt } from 'class-validator';

export class CreateCommandDto {
  @IsInt()
  table_id: number;
}
