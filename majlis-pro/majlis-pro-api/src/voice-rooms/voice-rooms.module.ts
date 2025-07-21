import { Module } from '@nestjs/common';
import { VoiceRoomsService } from './voice-rooms.service';
import { VoiceRoomsController } from './voice-rooms.controller';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [VoiceRoomsController],
  providers: [VoiceRoomsService, PrismaService],
  exports: [VoiceRoomsService],
})
export class VoiceRoomsModule {}
