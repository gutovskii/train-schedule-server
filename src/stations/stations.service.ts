import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StationsService {
  constructor(private readonly prismaService: PrismaService) {}

  findStations(search: string, take: number) {
    return this.prismaService.station.findMany({
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
      orderBy: {
        name: 'asc',
      },
      take,
    });
  }
}
