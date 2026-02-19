import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ListCategoriesDto } from './dto/list-categories.dto';
import { PaginationDto, PaginationMeta } from '../common/dto/pagination.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  async findAll(
    listCategoriesDto: ListCategoriesDto,
    paginationDto: PaginationDto,
  ): Promise<{ data: Category[]; success: boolean; meta: PaginationMeta }> {
    const { store_id } = listCategoriesDto;
    const { page = 1, limit = 10 } = paginationDto;

    const queryBuilder = this.categoryRepository.createQueryBuilder('category');

    if (store_id) {
      queryBuilder.where('category.store_id = :store_id', { store_id });
    }

    const [data, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('category.name', 'ASC')
      .getManyAndCount();

    const meta: PaginationMeta = {
      page,
      limit,
      total,
      total_pages: Math.ceil(total / limit) || 1,
    };

    return { data, success: true, meta };
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);
    Object.assign(category, updateCategoryDto);
    return this.categoryRepository.save(category);
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
  }
}
