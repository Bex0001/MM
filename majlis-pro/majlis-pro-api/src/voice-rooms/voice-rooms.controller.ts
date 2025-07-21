import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VoiceRoomsService } from './voice-rooms.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('voice-rooms')
@Controller('voice-rooms')
export class VoiceRoomsController {
  constructor(private readonly voiceRoomsService: VoiceRoomsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new voice room' })
  @ApiResponse({ status: 201, description: 'The voice room has been successfully created.' })
  async create(@Body() data: any) {
    return this.voiceRoomsService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all voice rooms' })
  async findAll() {
    return this.voiceRoomsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a voice room by ID' })
  async findOne(@Param('id') id: string) {
    return this.voiceRoomsService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a voice room' })
  async update(@Param('id') id: string, @Body() data: any) {
    return this.voiceRoomsService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a voice room' })
  async remove(@Param('id') id: string) {
    return this.voiceRoomsService.remove(id);
  }
}
