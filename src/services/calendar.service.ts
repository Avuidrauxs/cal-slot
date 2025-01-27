/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SlotRepository } from '../repositories/slot.repository';
import { CalendarQueryDto } from '../dtos/calendar-query.dto';
import { AvailableSlotDto } from '../dtos/available-slot.dto';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(SlotRepository)
    private slotRepository: SlotRepository,
  ) {}

  async findAvailableSlots(
    query: CalendarQueryDto,
  ): Promise<AvailableSlotDto[]> {
    const slots = await this.slotRepository.findAvailableSlots(query);

    return slots.map(
      (slot) =>
        new AvailableSlotDto(
          parseInt(slot.available_count),
          new Date(slot.start_date),
        ),
    );
  }
}
