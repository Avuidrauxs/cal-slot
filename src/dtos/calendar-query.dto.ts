import { IsDate, IsArray, IsString, ArrayNotEmpty } from 'class-validator';

export class CalendarQueryDto {
  @IsDate()
  date: Date;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  products: string[];

  @IsString()
  language: string;

  @IsString()
  rating: string;
}
