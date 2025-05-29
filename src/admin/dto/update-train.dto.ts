import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTrainDto {
  @IsString()
  @IsNotEmpty()
  oldTrainNumber: string;

  @IsString()
  @IsNotEmpty()
  newTrainNumber: string;
}
