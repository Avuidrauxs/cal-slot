import {
  IsDate,
  IsArray,
  IsString,
  ArrayNotEmpty,
  IsDateString,
} from 'class-validator';

export class CalendarQueryDto {
  @IsDateString()
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
