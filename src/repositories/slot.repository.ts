import { Repository } from 'typeorm';
import { Slot } from '../entities/slot.entity';
import { CalendarQueryDto } from '../dtos/calendar-query.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SlotRepository {
  constructor(
    @InjectRepository(Slot)
    private readonly repository: Repository<Slot>,
  ) {}
  async findAvailableSlots(query: CalendarQueryDto) {
    const queryBuilder = this.repository
      .createQueryBuilder('slot')
      .innerJoinAndSelect('slot.salesManager', 'salesManager')
      .where('DATE(slot.start_date) = DATE(:date)', { date: query.date })
      .andWhere('slot.booked = :booked', { booked: false })
      .andWhere(':product = ANY(salesManager.products)', {
        product: query.products[0],
      })
      .andWhere(':language = ANY(salesManager.languages)', {
        language: query.language,
      })
      .andWhere(':rating = ANY(salesManager.customer_ratings)', {
        rating: query.rating,
      })
      .select(['slot.start_date as start_date', 'COUNT(*) as available_count'])
      .groupBy('slot.start_date')
      .orderBy('slot.start_date', 'ASC');

    return queryBuilder.getRawMany();
  }
}
