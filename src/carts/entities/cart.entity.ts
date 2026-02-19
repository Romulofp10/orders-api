import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Command } from '../../commands/entities/command.entity';
import { CartItem } from '../../cart-items/entities/cart-item.entity';

export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
  PIX = 'pix',
}

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'command_id' })
  command_id: number;

  @ManyToOne(() => Command)
  @JoinColumn({ name: 'command_id' })
  command: Command;

  @Column({ name: 'payment_method', type: 'varchar', length: 20 })
  payment_method: string;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  items: CartItem[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
