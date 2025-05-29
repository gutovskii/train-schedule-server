import { Controller, Get, Query } from '@nestjs/common';
import {
  ScheduleQueryParams,
  SchedulesQueryPipe,
} from './pipes/schedules.pipe';
import { SchedulesService } from './schedules.service';

@Controller('schedule')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Get()
  findAll(@Query(SchedulesQueryPipe) scheduleQuery: ScheduleQueryParams) {
    return this.schedulesService.findAll(scheduleQuery);
  }
}
