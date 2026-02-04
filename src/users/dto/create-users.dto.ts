import { IsString, IsEmail } from 'class-validator';

export class CreateUsersDto {
  @IsString({})
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}
