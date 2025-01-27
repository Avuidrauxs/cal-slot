export class AvailableSlotDto {
  available_count: number;
  start_date: string;

  constructor(count: number, date: Date) {
    this.available_count = count;
    this.start_date = date.toISOString();
  }
}
