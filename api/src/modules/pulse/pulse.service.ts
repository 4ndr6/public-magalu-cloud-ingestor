import { Injectable } from '@nestjs/common';
import { Pulse } from '@prisma/client';
import { PrismaService } from '../../services/prisma/prisma.service';
import { CreatePulseDTO } from './dto/create-pulse.dto';

@Injectable()
export class PulseService {
  constructor(private prisma: PrismaService) {}

  async createOrUpdate(data: CreatePulseDTO): Promise<Pulse> {
    const product = await this.prisma.product.findFirst({ where: { sku: data.product.sku } });
    const tenant = await this.prisma.tenant.findFirst({ where: { name: data.tenant.name } });
    if (product?.id && tenant?.id) {
      const pulse = await this.prisma.pulse.findFirst({ where: { productId: product?.id, tenantId: tenant?.id } });
      if (pulse?.id) {
        data.usedAmount = BigInt(BigInt(pulse.usedAmount) + BigInt(data.usedAmount)).toString(); // incrementa consumo
        return await this.update(pulse.id, data);
      }
    }
    return await this.create(data);
  }

  async create(data: CreatePulseDTO): Promise<Pulse> {
    return this.prisma.pulse.create({
      data: {
        usedAmount: data.usedAmount,
        useUnity: data.useUnity,
        product: {
          connectOrCreate: {
            create: {
              ...data.product,
            },
            where: {
              sku: data.product.sku,
            },
          },
        },
        tenant: {
          connectOrCreate: {
            create: {
              ...data.tenant,
            },
            where: {
              name: data.tenant.name,
            },
          },
        },
      },
      include: {
        product: {
          select: {
            sku: true,
            description: true,
            // createdAt: true,
            // updatedAt: true,
          },
        },
        tenant: {
          select: {
            name: true,
            // createdAt: true,
            // updatedAt: true,
          },
        },
      },
    });
  }

  async update(id: string, data: Partial<CreatePulseDTO>): Promise<Pulse> {
    return this.prisma.pulse.update({
      data: {
        usedAmount: data.usedAmount,
        useUnity: data.useUnity,
        product: {
          connectOrCreate: {
            create: {
              ...data.product,
            },
            where: {
              sku: data.product.sku,
            },
          },
        },
        tenant: {
          connectOrCreate: {
            create: {
              ...data.tenant,
            },
            where: {
              name: data.tenant.name,
            },
          },
        },
      },
      include: {
        product: {
          select: {
            sku: true,
            description: true,
            // createdAt: true,
            // updatedAt: true,
          },
        },
        tenant: {
          select: {
            name: true,
            // createdAt: true,
            // updatedAt: true,
          },
        },
      },
      where: { id },
    });
  }

  async findAll(): Promise<Pulse[]> {
    return this.prisma.pulse.findMany({
      include: {
        product: {
          select: {
            id: true,
            sku: true,
            // createdAt: true,
            // updatedAt: true,
          },
        },
        tenant: {
          select: {
            id: true,
            name: true,
            // createdAt: true,
            // updatedAt: true,
          },
        },
      },
    });
  }

  async findOne(id: string): Promise<Pulse | null> {
    return this.prisma.pulse.findUnique({
      where: { id },
      include: {
        product: {
          select: {
            id: true,
            sku: true,
            // createdAt: true,
            // updatedAt: true,
          },
        },
        tenant: {
          select: {
            id: true,
            name: true,
            // createdAt: true,
            // updatedAt: true,
          },
        },
      },
    });
  }

  async remove(id: string): Promise<Pulse> {
    return this.prisma.pulse.delete({ where: { id } });
  }
}
