import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Table } from '../../tables/entities/table.entity';

export type CommandType = 'table' | 'command';

@Entity('commands')
export class Command {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'table_id' })
  table_id: number;

  @ManyToOne(() => Table)
  @JoinColumn({ name: 'table_id' })
  table: Table;

  @Column({ type: 'varchar', length: 20, default: 'table' })
  type: CommandType;

  @Column({ name: 'closed_at', type: 'datetime', nullable: true })
  closed_at: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
