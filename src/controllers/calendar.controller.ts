import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { CalendarService } from '../services/calendar.service';
import { CalendarQueryDto } from '../dtos/calendar-query.dto';
import { AvailableSlotDto } from '../dtos/available-slot.dto';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Post('query')
  @HttpCode(200)
  async queryAvailableSlots(
    @Body(new ValidationPipe({ transform: true })) query: CalendarQueryDto,
  ): Promise<AvailableSlotDto[]> {
    return this.calendarService.findAvailableSlots(query);
  }
}
