import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { StationsService } from './stations.service';

export const DEFAULT_STATIONS_SEARCH_LIMIT = 5;

@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Get()
  findStations(
    @Query('search') search: string,
    @Query(
      'take',
      ParseIntPipe,
      new DefaultValuePipe(DEFAULT_STATIONS_SEARCH_LIMIT),
    )
    take: number,
  ) {
    return this.stationsService.findStations(search, take);
  }
}
