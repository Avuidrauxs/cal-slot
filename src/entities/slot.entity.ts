import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SalesManager } from './sales-manager.entity';

@Entity('slots')
export class Slot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamptz')
  start_date: Date;

  @Column('timestamptz')
  end_date: Date;

  @Column()
  booked: boolean;

  @Column()
  sales_manager_id: number;

  @ManyToOne(() => SalesManager, (salesManager) => salesManager.slots)
  @JoinColumn({ name: 'sales_manager_id' })
  salesManager: SalesManager;
}
