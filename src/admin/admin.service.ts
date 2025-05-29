import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrainDto } from './dto/create-train.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  async findTrain(trainNumber: string) {
    const train = await this.prismaService.train.findFirst({
      where: {
        trainNumber,
      },
      include: {
        stops: true,
      },
    });

    if (!train) {
      throw new NotFoundException(`Train number ${trainNumber} does not exist`);
    }

    return train;
  }

  findTrains(search: string, take: number) {
    return this.prismaService.train.findMany({
      where: {
        trainNumber: search
          ? {
              contains: search,
              mode: 'insensitive',
            }
          : {},
      },
      orderBy: { trainNumber: 'asc' },
      take,
    });
  }

  async createTrain(dto: CreateTrainDto) {
    const existingTrain = await this.prismaService.train.findFirst({
      where: { trainNumber: dto.trainNumber },
    });

    if (existingTrain) {
      throw new BadRequestException(
        `Train with number ${dto.trainNumber} already exists`,
      );
    }

    await this.prismaService.train.create({
      data: {
        trainNumber: dto.trainNumber,
        stops: {
          createMany: {
            data: dto.stops,
          },
        },
      },
    });
  }

  async updateTrain(oldTrainNumber: string, newTrainNumber: string) {
    const train = await this.prismaService.train.findFirst({
      where: { trainNumber: oldTrainNumber },
    });

    if (!train) {
      throw new BadRequestException(
        `Failed to update the train with number ${oldTrainNumber}. It does not exist`,
      );
    }

    const existingTrain = await this.prismaService.train.findFirst({
      where: { trainNumber: newTrainNumber },
    });

    if (existingTrain) {
      throw new BadRequestException(
        `Failed to update the train with number ${newTrainNumber}. New number is already exists`,
      );
    }

    await this.prismaService.train.update({
      where: { trainNumber: oldTrainNumber },
      data: { trainNumber: newTrainNumber },
    });
  }

  async deleteTrain(trainNumber: string) {
    const train = await this.prismaService.train.findFirst({
      where: { trainNumber },
    });

    if (!train) {
      throw new BadRequestException(
        `Train with number ${trainNumber} does not exist`,
      );
    }

    await this.prismaService.train.delete({
      where: { trainNumber },
    });
  }
}
