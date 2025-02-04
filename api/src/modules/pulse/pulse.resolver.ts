import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../../services/prisma/prisma.service';
import { PulseDTO } from './dto/pulse.dto';

@Resolver(() => PulseDTO)
export class PulseResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [PulseDTO])
  async pulses() {
    return this.prisma.pulse.findMany();
  }

  @Mutation(() => PulseDTO)
  async createPulse(@Args('tenantId') tenantId: string, @Args('productId') productId: string, @Args('usedAmount') usedAmount: string, @Args('useUnity') useUnity: string) {
    return this.prisma.pulse.create({
      data: {
        tenantId,
        productId,
        usedAmount,
        useUnity,
      },
    });
  }
}
