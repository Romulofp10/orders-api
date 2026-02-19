import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ListCartsDto } from './dto/list-carts.dto';
import { PaginationDto, PaginationMeta } from '../common/dto/pagination.dto';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    const cart = this.cartRepository.create(createCartDto);
    return this.cartRepository.save(cart);
  }

  async findAll(
    listCartsDto: ListCartsDto,
    paginationDto: PaginationDto,
  ): Promise<{ data: Cart[]; success: boolean; meta: PaginationMeta }> {
    const { command_id } = listCartsDto;
    const { page = 1, limit = 10 } = paginationDto;

    const queryBuilder = this.cartRepository.createQueryBuilder('cart');

    if (command_id) {
      queryBuilder.where('cart.command_id = :command_id', { command_id });
    }

    const [data, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('cart.id', 'DESC')
      .getManyAndCount();

    const meta: PaginationMeta = {
      page,
      limit,
      total,
      total_pages: Math.ceil(total / limit) || 1,
    };

    return { data, success: true, meta };
  }

  async findOne(id: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { id },
      relations: ['items', 'items.product', 'items.addons', 'items.addons.product_addon', 'command'],
    });
    if (!cart) {
      throw new NotFoundException(`Cart with id ${id} not found`);
    }
    return cart;
  }

  async update(id: number, updateCartDto: UpdateCartDto): Promise<Cart> {
    const cart = await this.findOne(id);
    Object.assign(cart, updateCartDto);
    return this.cartRepository.save(cart);
  }

  async remove(id: number): Promise<void> {
    const cart = await this.findOne(id);
    await this.cartRepository.remove(cart);
  }
}
