import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Tenant } from '@prisma/client';
import { TenantService } from './tenant.service';

@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  async create(@Body() createTenantDto: { name: string }): Promise<Tenant> {
    return this.tenantService.create(createTenantDto);
  }

  @Get()
  async findAll(): Promise<Tenant[]> {
    return this.tenantService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Tenant> {
    return this.tenantService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTenantDto: { name?: string },
  ): Promise<Tenant> {
    return this.tenantService.update(id, updateTenantDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Tenant> {
    return this.tenantService.remove(id);
  }
}
