import { IsString, IsInt, IsNumber, IsOptional, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsInt()
  category_id: number;

  @IsString()
  @MaxLength(255)
  name: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;
}
