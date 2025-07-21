import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class DealsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.deal.create({ data });
  }

  async findAll() {
    return this.prisma.deal.findMany();
  }

  async findById(id: string) {
    return this.prisma.deal.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    return this.prisma.deal.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.deal.delete({ where: { id } });
  }
}
