import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { SalesManager } from './entities/sales-manager.entity';
import { Slot } from './entities/slot.entity';
import { SlotRepository } from './repositories/slot.repository';
import { CalendarController } from './controllers/calendar.controller';
import { CalendarService } from './services/calendar.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([Slot, SalesManager, SlotRepository]),
  ],
  controllers: [AppController, CalendarController],
  providers: [AppService, CalendarService],
})
export class AppModule {}
