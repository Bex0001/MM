import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DealsService } from './deals.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('deals')
@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new deal' })
  @ApiResponse({ status: 201, description: 'The deal has been successfully created.' })
  async create(@Body() data: any) {
    return this.dealsService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all deals' })
  async findAll() {
    return this.dealsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a deal by ID' })
  async findOne(@Param('id') id: string) {
    return this.dealsService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a deal' })
  async update(@Param('id') id: string, @Body() data: any) {
    return this.dealsService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a deal' })
  async remove(@Param('id') id: string) {
    return this.dealsService.remove(id);
  }
}
