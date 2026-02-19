import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Command } from './entities/command.entity';
import { CreateCommandDto } from './dto/create-command.dto';
import { ListCommandsDto } from './dto/list-commands.dto';
import { PaginationDto, PaginationMeta } from '../common/dto/pagination.dto';

@Injectable()
export class CommandsService {
  constructor(
    @InjectRepository(Command)
    private readonly commandRepository: Repository<Command>,
  ) {}

  async create(createCommandDto: CreateCommandDto): Promise<Command> {
    return this.commandRepository.manager.transaction(async (manager) => {
      const repo = manager.getRepository(Command);
      const { table_id } = createCommandDto;

      const count = await repo.count({ where: { table_id } });

      if (count === 0) {
        const command = repo.create({
          ...createCommandDto,
          type: 'table',
        });
        return repo.save(command);
      }
      await repo
        .createQueryBuilder()
        .update(Command)
        .set({ type: 'command' })
        .where('table_id = :table_id', { table_id })
        .andWhere('type = :type', { type: 'table' })
        .andWhere('closed_at IS NULL')
        .execute();

      const command = repo.create({
        ...createCommandDto,
        type: 'command',
      });
      return repo.save(command);
    });
  }

  async findAll(
    listCommandsDto: ListCommandsDto,
    paginationDto: PaginationDto,
  ): Promise<{ data: Command[]; success: boolean; meta: PaginationMeta }> {
    const { table_id } = listCommandsDto;
    const { page = 1, limit = 10 } = paginationDto;

    const queryBuilder = this.commandRepository.createQueryBuilder('command');

    if (table_id) {
      queryBuilder.where('command.table_id = :table_id', { table_id });
    }

    const [data, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('command.id', 'ASC')
      .getManyAndCount();

    const meta: PaginationMeta = {
      page,
      limit,
      total,
      total_pages: Math.ceil(total / limit) || 1,
    };

    return { data, success: true, meta };
  }

  async findOne(id: number): Promise<Command> {
    const command = await this.commandRepository.findOne({ where: { id } });
    if (!command) {
      throw new NotFoundException(`Command with id ${id} not found`);
    }
    return command;
  }

  async remove(id: number): Promise<void> {
    const command = await this.findOne(id);
    await this.commandRepository.remove(command);
  }
}
