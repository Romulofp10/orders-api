import { Expose } from 'class-transformer';

export class StoreResponseDto {
  @Expose({ name: 'id' })
  id: number;

  @Expose({ name: 'name' })
  name: string;

  @Expose({ name: 'address' })
  address: string;

  @Expose({ name: 'created_at' })
  created_at: Date;

  @Expose({ name: 'updated_at' })
  updated_at: Date;
}
