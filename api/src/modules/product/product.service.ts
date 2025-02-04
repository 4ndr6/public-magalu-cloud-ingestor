import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client'; // Importa o tipo Product
import { PrismaService } from '../../services/prisma/prisma.service';
import { CreateProductDTO } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdate(data: CreateProductDTO): Promise<Product> {
    const product = await this.prisma.product.findFirst({ where: { sku: data.sku } });
    return product?.id ? this.update(product.id, data) : this.create(data);
  }

  async create(data: { sku: string; description?: string }): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findOne(id: string): Promise<Product> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async update(id: string, data: { sku?: string; description?: string }): Promise<Product> {
    return this.prisma.product.update({ where: { id }, data: { description: data.description } });
  }

  async remove(id: string): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }
}
