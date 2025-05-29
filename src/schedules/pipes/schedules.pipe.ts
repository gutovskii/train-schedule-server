import { BadRequestException } from '@nestjs/common';

export enum ScheduleSortBy {
  DEPARTURE = 'departure',
  ARRIVAL = 'arrival',
}

export type ScheduleQueryParams = {
  search?: string;
  fromStation: string;
  toStation: string;
  arrivalDate: string;
  sortBy?: ScheduleSortBy;
  sortOrder?: 'ASC' | 'DESC';
};

export class SchedulesQueryPipe {
  transform(value: ScheduleQueryParams): ScheduleQueryParams {
    const { search, fromStation, toStation, arrivalDate, sortBy, sortOrder } =
      value;

    if (!fromStation || !toStation || !arrivalDate) {
      throw new BadRequestException(
        'fromStation, toStation, and arrivalDate params are required',
      );
    }

    if (fromStation === toStation) {
      throw new BadRequestException(
        'fromStation and toStation cannot be the same',
      );
    }

    const sortByValues = Object.values(ScheduleSortBy);
    if (sortBy && !sortByValues.includes(sortBy)) {
      throw new BadRequestException(
        'Invalid sortBy value. Possible values are: ' + sortByValues.join(', '),
      );
    }

    if (sortOrder && !['ASC', 'DESC'].includes(sortOrder)) {
      throw new BadRequestException(
        'Invalid sortOrder value. Possible values are: ASC, DESC ',
      );
    }

    return {
      search: search || '',
      fromStation: fromStation.trim(),
      toStation: toStation.trim(),
      arrivalDate,
      sortBy,
      sortOrder,
    };
  }
}
