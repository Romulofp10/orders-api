import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { PaginationDto, PaginationMeta } from '../common/dto/pagination.dto';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async create(createStoreDto: CreateStoreDto): Promise<Store> {
    const store = this.storeRepository.create(createStoreDto);
    store.code = await this.generateUniqueCode();
    return this.storeRepository.save(store);
  }

  private async generateUniqueCode(): Promise<string> {
    const maxAttempts = 100;
    for (let i = 0; i < maxAttempts; i++) {
      const code = String(Math.floor(1000 + Math.random() * 9000));
      const exists = await this.storeRepository.findOne({ where: { code } });
      if (!exists) return code;
    }
    throw new Error('Unable to generate unique store code');
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<{ data: Store[]; success: boolean; meta: PaginationMeta }> {
    const { page = 1, limit = 10 } = paginationDto;
    const [data, total] = await this.storeRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
    });

    const meta: PaginationMeta = {
      page,
      limit,
      total,
      total_pages: Math.ceil(total / limit) || 1,
    };

    return { data, success: true, meta };
  }

  async findOne(id: number): Promise<Store> {
    const store = await this.storeRepository.findOne({ where: { id } });
    if (!store) {
      throw new NotFoundException(`Store with id ${id} not found`);
    }
    return store;
  }

  async update(id: number, updateStoreDto: UpdateStoreDto): Promise<Store> {
    const store = await this.findOne(id);
    Object.assign(store, updateStoreDto);
    return this.storeRepository.save(store);
  }

  async remove(id: number): Promise<void> {
    const store = await this.findOne(id);
    await this.storeRepository.remove(store);
  }
}
