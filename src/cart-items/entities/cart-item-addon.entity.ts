import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CartItem } from './cart-item.entity';
import { ProductAddOn } from '../../product-addons/entities/product-addon.entity';

@Entity('cart_item_addons')
export class CartItemAddOn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cart_item_id' })
  cart_item_id: number;

  @ManyToOne(() => CartItem, (cartItem) => cartItem.addons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart_item_id' })
  cart_item: CartItem;

  @Column({ name: 'product_addon_id' })
  product_addon_id: number;

  @ManyToOne(() => ProductAddOn)
  @JoinColumn({ name: 'product_addon_id' })
  product_addon: ProductAddOn;
}
