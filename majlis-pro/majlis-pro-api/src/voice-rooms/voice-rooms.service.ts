import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class VoiceRoomsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.voiceRoom.create({ data });
  }

  async findAll() {
    return this.prisma.voiceRoom.findMany();
  }

  async findById(id: string) {
    return this.prisma.voiceRoom.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    return this.prisma.voiceRoom.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.voiceRoom.delete({ where: { id } });
  }
}
