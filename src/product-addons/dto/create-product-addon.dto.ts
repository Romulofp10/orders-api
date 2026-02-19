import { IsString, IsInt, IsNumber, MaxLength } from 'class-validator';

export class CreateProductAddOnDto {
  @IsInt()
  product_id: number;

  @IsString()
  @MaxLength(255)
  name: string;

  @IsNumber()
  price: number;
}
