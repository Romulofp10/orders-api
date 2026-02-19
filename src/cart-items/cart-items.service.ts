import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart-item.entity';
import { CartItemAddOn } from './entities/cart-item-addon.entity';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(CartItemAddOn)
    private readonly cartItemAddOnRepository: Repository<CartItemAddOn>,
  ) {}

  async create(createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    const { addon_ids, ...rest } = createCartItemDto;
    const cartItem = this.cartItemRepository.create(rest);
    const savedCartItem = await this.cartItemRepository.save(cartItem);

    if (addon_ids && addon_ids.length > 0) {
      for (const product_addon_id of addon_ids) {
        const addon = this.cartItemAddOnRepository.create({
          cart_item_id: savedCartItem.id,
          product_addon_id,
        });
        await this.cartItemAddOnRepository.save(addon);
      }
    }

    return this.findOne(savedCartItem.id);
  }

  async findOne(id: number): Promise<CartItem> {
    const cartItem = await this.cartItemRepository.findOne({
      where: { id },
      relations: ['product', 'addons', 'addons.product_addon'],
    });
    if (!cartItem) {
      throw new NotFoundException(`Cart item with id ${id} not found`);
    }
    return cartItem;
  }

  async update(id: number, updateCartItemDto: UpdateCartItemDto): Promise<CartItem> {
    const cartItem = await this.findOne(id);

    if (updateCartItemDto.quantity !== undefined) {
      cartItem.quantity = updateCartItemDto.quantity;
    }

    if (updateCartItemDto.addon_ids !== undefined) {
      await this.cartItemAddOnRepository.delete({ cart_item_id: id });
      for (const product_addon_id of updateCartItemDto.addon_ids) {
        const addon = this.cartItemAddOnRepository.create({
          cart_item_id: id,
          product_addon_id,
        });
        await this.cartItemAddOnRepository.save(addon);
      }
    }

    await this.cartItemRepository.save(cartItem);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const cartItem = await this.cartItemRepository.findOne({ where: { id } });
    if (!cartItem) {
      throw new NotFoundException(`Cart item with id ${id} not found`);
    }
    await this.cartItemAddOnRepository.delete({ cart_item_id: id });
    await this.cartItemRepository.remove(cartItem);
  }
}
