import { Expose } from 'class-transformer';

export class WaiterResponseDto {
  @Expose({ name: 'id' })
  id: number;

  @Expose({ name: 'store_id' })
  store_id: number;

  @Expose({ name: 'name' })
  name: string;

  @Expose({ name: 'email' })
  email: string;

  @Expose({ name: 'created_at' })
  created_at: Date;
}
