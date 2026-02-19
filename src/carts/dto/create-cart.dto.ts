import { IsInt, IsString, IsIn } from 'class-validator';

export const PAYMENT_METHODS = ['cash', 'card', 'pix'] as const;

export class CreateCartDto {
  @IsInt()
  command_id: number;

  @IsString()
  @IsIn(PAYMENT_METHODS)
  payment_method: string;
}
