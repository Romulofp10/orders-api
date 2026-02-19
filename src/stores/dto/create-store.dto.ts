import { IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  @MaxLength(100)
  slug: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  address?: string;
}
