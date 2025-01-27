import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Slot } from './slot.entity';

@Entity('sales_managers')
export class SalesManager {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('varchar', { array: true })
  languages: string[];

  @Column('varchar', { array: true })
  products: string[];

  @Column('varchar', { array: true })
  customer_ratings: string[];

  @OneToMany(() => Slot, (slot) => slot.salesManager)
  slots: Slot[];
}
