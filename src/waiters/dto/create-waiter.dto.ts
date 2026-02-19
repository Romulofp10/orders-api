import { IsString, IsEmail, IsInt, MinLength } from 'class-validator';

export class CreateWaiterDto {
  @IsInt()
  store_id: number;

  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
