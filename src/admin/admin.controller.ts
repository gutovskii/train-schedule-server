import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards';
import { AdminGuard } from './admin.guard';
import { CreateTrainDto } from './dto/create-train.dto';
import { AdminService } from './admin.service';
import { UpdateTrainDto } from './dto/update-train.dto';

export const DEFAULT_STATIONS_SEARCH_LIMIT = 5;

@Controller('admin')
@UseGuards(JwtGuard, AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('trains/:trainNumber')
  findTrain(@Param('trainNumber') trainNumber: string) {
    return this.adminService.findTrain(trainNumber);
  }

  @Get('trains')
  findTrains(
    @Query('search') search: string,
    @Query(
      'take',
      ParseIntPipe,
      new DefaultValuePipe(DEFAULT_STATIONS_SEARCH_LIMIT),
    )
    take: number,
  ) {
    return this.adminService.findTrains(search, take);
  }

  @Post('trains')
  createTrain(@Body() dto: CreateTrainDto) {
    return this.adminService.createTrain(dto);
  }

  @Delete('trains/:trainNumber')
  deleteTrain(@Param('trainNumber') trainNumber: string) {
    return this.adminService.deleteTrain(trainNumber);
  }

  @Put('trains')
  updateTrain(@Body() dto: UpdateTrainDto) {
    return this.adminService.updateTrain(
      dto.oldTrainNumber,
      dto.newTrainNumber,
    );
  }

  // TODO
  @Post('stations')
  createStation() {}

  @Put('stations/:id')
  updateStation() {}

  @Delete('stations/:id')
  deleteStation() {}
}
