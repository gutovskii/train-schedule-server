import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ScheduleQueryParams, ScheduleSortBy } from './pipes/schedules.pipe';
import { ScheduleViewModel } from './view-models/schedule.view-model';

@Injectable()
export class SchedulesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(query: ScheduleQueryParams) {
    const {
      fromStation,
      toStation,
      arrivalDate,
      sortBy = ScheduleSortBy.DEPARTURE,
      sortOrder = 'ASC',
    } = query;

    const dayStart = new Date(arrivalDate);
    dayStart.setUTCHours(0, 0, 0, 0);

    const dayEnd = new Date(dayStart);
    dayEnd.setUTCDate(dayEnd.getUTCDate() + 1);

    // I can explain...
    const schedules = await this.prismaService.$queryRawUnsafe<
      ScheduleViewModel[]
    >(
      `SELECT 
        "Train"."id" AS "trainId",
        "Train"."trainNumber" as "trainNumber",
        "stopFrom"."stationName" AS "fromStation",
        "stopFrom"."departureTime" AS "fromDepartureTime",
        "stopTo"."stationName" AS "toStation",
        "stopTo"."arrivalTime" AS "toArrivalTime"
      FROM "Train"
      JOIN "Stop" AS "stopFrom"
        ON "stopFrom"."trainId" = "Train"."id"
        AND "stopFrom"."stationName" = $1
      JOIN "Stop" AS "stopTo"
        ON "stopTo"."trainId" = "Train"."id"
        AND "stopTo"."stationName" = $2
      WHERE "stopFrom"."stopOrder" < "stopTo"."stopOrder"
        AND "stopFrom"."departureTime" >= $3
        AND "stopFrom"."departureTime" < $4
      ORDER BY ${sortBy === ScheduleSortBy.DEPARTURE ? `"stopFrom"."departureTime"` : `"stopTo"."arrivalTime"`} ${sortOrder === 'ASC' ? 'ASC' : 'DESC'}`,
      fromStation,
      toStation,
      dayStart,
      dayEnd,
      sortOrder,
    );

    return schedules;
  }
}
