import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { PrismaService } from './database/prisma.service';
import { PostsModule } from './posts/posts.module';
import { DealsModule } from './deals/deals.module';
import { VoiceRoomsModule } from './voice-rooms/voice-rooms.module';

@Module({
  imports: [AuthModule, UsersModule, CompaniesModule, PostsModule, DealsModule, VoiceRoomsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

