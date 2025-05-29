import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateTrainDto {
  @IsString()
  @IsNotEmpty()
  trainNumber: string;

  @ValidateNested({ each: true })
  @Type(() => TrainStopDto)
  @ArrayMinSize(2, { message: 'At least two stops are required' })
  stops: TrainStopDto[];
}

export class TrainStopDto {
  @IsString()
  @IsNotEmpty()
  stationName: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  arrivalTime: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  departureTime: string;

  @IsInt()
  @Min(1, { message: 'Order must be a positive integer' })
  stopOrder: number;
}
