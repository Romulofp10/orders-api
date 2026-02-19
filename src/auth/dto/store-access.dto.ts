import { IsString, Length, Matches } from 'class-validator';

export class StoreAccessDto {
  @IsString()
  @Length(4, 4)
  @Matches(/^\d{4}$/, { message: 'code must be exactly 4 digits' })
  code: string;

  @IsString()
  slug: string;
}
