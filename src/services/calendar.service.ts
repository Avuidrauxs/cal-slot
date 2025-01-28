/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CalendarQueryDto } from '../dtos/calendar-query.dto';
import { AvailableSlotDto } from '../dtos/available-slot.dto';
import { Slot } from 'src/entities/slot.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(Slot)
    private readonly repository: Repository<Slot>,
  ) {}

  async findAvailableSlotsAlt(query: CalendarQueryDto) {
    const queryBuilder = this.repository
      .createQueryBuilder('slot')
      .innerJoinAndSelect('slot.salesManager', 'salesManager')
      .where('DATE(slot.start_date) = DATE(:date)', { date: query.date })
      .andWhere('slot.booked = :booked', { booked: false })
      .andWhere('salesManager.products @> :products', {
        products: query.products,
      })
      .andWhere(':language = ANY(salesManager.languages)', {
        language: query.language,
      })
      .andWhere(':rating = ANY(salesManager.customer_ratings)', {
        rating: query.rating,
      })
      .andWhere(
        'NOT EXISTS (SELECT 1 FROM slots s2 WHERE ' +
          's2.sales_manager_id = slot.sales_manager_id ' +
          'AND s2.booked = TRUE ' +
          'AND s2.start_date < slot.end_date ' +
          'AND s2.end_date > slot.start_date)',
      )
      .select(['slot.start_date as start_date', 'COUNT(*) as available_count'])
      .groupBy('slot.start_date')
      .orderBy('slot.start_date', 'ASC');

    return queryBuilder.getRawMany();
  }

  async findAvailableSlots(
    query: CalendarQueryDto,
  ): Promise<AvailableSlotDto[]> {
    const slots = await this.findAvailableSlotsAlt(query);

    return slots.map(
      (slot) =>
        new AvailableSlotDto(
          parseInt(slot.available_count),
          new Date(slot.start_date),
        ),
    );
  }
}
