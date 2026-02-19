import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductAddOn } from './entities/product-addon.entity';
import { CreateProductAddOnDto } from './dto/create-product-addon.dto';
import { UpdateProductAddOnDto } from './dto/update-product-addon.dto';
import { ListProductAddOnsDto } from './dto/list-product-addons.dto';
import { PaginationDto, PaginationMeta } from '../common/dto/pagination.dto';

@Injectable()
export class ProductAddOnsService {
  constructor(
    @InjectRepository(ProductAddOn)
    private readonly productAddOnRepository: Repository<ProductAddOn>,
  ) {}

  async create(createProductAddOnDto: CreateProductAddOnDto): Promise<ProductAddOn> {
    const productAddOn = this.productAddOnRepository.create(createProductAddOnDto);
    return this.productAddOnRepository.save(productAddOn);
  }

  async findAll(
    listProductAddOnsDto: ListProductAddOnsDto,
    paginationDto: PaginationDto,
  ): Promise<{ data: ProductAddOn[]; success: boolean; meta: PaginationMeta }> {
    const { product_id } = listProductAddOnsDto;
    const { page = 1, limit = 10 } = paginationDto;

    const queryBuilder = this.productAddOnRepository.createQueryBuilder('product_addon');

    if (product_id) {
      queryBuilder.where('product_addon.product_id = :product_id', { product_id });
    }

    const [data, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('product_addon.name', 'ASC')
      .getManyAndCount();

    const meta: PaginationMeta = {
      page,
      limit,
      total,
      total_pages: Math.ceil(total / limit) || 1,
    };

    return { data, success: true, meta };
  }

  async findOne(id: number): Promise<ProductAddOn> {
    const productAddOn = await this.productAddOnRepository.findOne({ where: { id } });
    if (!productAddOn) {
      throw new NotFoundException(`Product addon with id ${id} not found`);
    }
    return productAddOn;
  }

  async update(
    id: number,
    updateProductAddOnDto: UpdateProductAddOnDto,
  ): Promise<ProductAddOn> {
    const productAddOn = await this.findOne(id);
    Object.assign(productAddOn, updateProductAddOnDto);
    return this.productAddOnRepository.save(productAddOn);
  }

  async remove(id: number): Promise<void> {
    const productAddOn = await this.findOne(id);
    await this.productAddOnRepository.remove(productAddOn);
  }
}
