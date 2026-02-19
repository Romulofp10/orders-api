import { IsString, IsInt, IsOptional, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsInt()
  store_id: number;

  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;
}
