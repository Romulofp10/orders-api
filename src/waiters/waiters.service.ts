import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Waiter } from './entities/waiter.entity';
import { CreateWaiterDto } from './dto/create-waiter.dto';
import { UpdateWaiterDto } from './dto/update-waiter.dto';
import { SelectWaiterDto } from './dto/select-waiter.dto';
import { PaginationDto, PaginationMeta } from '../common/dto/pagination.dto';

@Injectable()
export class WaitersService {
  constructor(
    @InjectRepository(Waiter)
    private readonly waiterRepository: Repository<Waiter>,
  ) {}

  async create(createWaiterDto: CreateWaiterDto): Promise<Waiter> {
    const waiter = this.waiterRepository.create(createWaiterDto);
    return this.waiterRepository.save(waiter);
  }

  async findAll(
    selectWaiterDto: SelectWaiterDto,
    paginationDto: PaginationDto,
  ): Promise<{ data: Waiter[]; success: boolean; meta?: PaginationMeta }> {
    const { store_id } = selectWaiterDto;
    const { page = 1, limit = 10 } = paginationDto;

    const queryBuilder = this.waiterRepository
      .createQueryBuilder('waiter')
      .select(['waiter.id', 'waiter.store_id', 'waiter.name', 'waiter.email', 'waiter.created_at']);

    if (store_id) {
      queryBuilder.where('waiter.store_id = :store_id', { store_id });
    }

    const [data, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('waiter.id', 'ASC')
      .getManyAndCount();

    const meta: PaginationMeta = {
      page,
      limit,
      total,
      total_pages: Math.ceil(total / limit) || 1,
    };

    return { data, success: true, meta };
  }

  async findOne(id: number): Promise<Waiter> {
    const waiter = await this.waiterRepository.findOne({
      where: { id },
      select: ['id', 'store_id', 'name', 'email', 'created_at', 'updated_at'],
    });
    if (!waiter) {
      throw new NotFoundException(`Waiter with id ${id} not found`);
    }
    return waiter;
  }

  private async findOneOrFail(id: number): Promise<Waiter> {
    const waiter = await this.waiterRepository.findOne({ where: { id } });
    if (!waiter) {
      throw new NotFoundException(`Waiter with id ${id} not found`);
    }
    return waiter;
  }

  async update(id: number, updateWaiterDto: UpdateWaiterDto): Promise<Waiter> {
    const waiter = await this.findOneOrFail(id);
    Object.assign(waiter, updateWaiterDto);
    return this.waiterRepository.save(waiter);
  }

  async remove(id: number): Promise<void> {
    const waiter = await this.findOneOrFail(id);
    await this.waiterRepository.remove(waiter);
  }
}
