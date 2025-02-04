import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma/prisma.service';
import { PulseController } from './pulse.controller';
import { PulseResolver } from './pulse.resolver';
import { PulseService } from './pulse.service';

@Module({
  controllers: [PulseController],
  providers: [PulseResolver, PulseService, PrismaService],
})
export class PulseModule {}
