import { Module } from '@nestjs/common';
import { StationsController } from './stations.controller';
import { StationsService } from './stations.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [StationsController],
  providers: [StationsService],
  exports: [StationsService],
  imports: [PrismaModule],
})
export class StationsModule {}
