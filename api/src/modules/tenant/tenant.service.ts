import { Injectable } from '@nestjs/common';
import { Tenant } from '@prisma/client';
import { PrismaService } from '../../services/prisma/prisma.service';
import { CreateTenantDTO } from './dto/create-tenant.dto';

@Injectable()
export class TenantService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdate(data: CreateTenantDTO): Promise<Tenant> {
    const tenant = await this.prisma.tenant.findFirst({ where: { name: data.name } });
    return tenant?.id ? this.update(tenant.id, data) : this.create(data);
  }

  async create(data: { name: string; id?: string }): Promise<Tenant> {
    return this.prisma.tenant.create({ data });
  }

  async findAll(): Promise<Tenant[]> {
    return this.prisma.tenant.findMany();
  }

  async findOne(id: string): Promise<Tenant> {
    return this.prisma.tenant.findUnique({ where: { id } });
  }

  async update(id: string, data: { name?: string }): Promise<Tenant> {
    return this.prisma.tenant.update({ where: { id }, data });
  }

  async remove(id: string): Promise<Tenant> {
    return this.prisma.tenant.delete({ where: { id } });
  }
}
