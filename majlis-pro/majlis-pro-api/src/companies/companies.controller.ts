import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new company' })
  @ApiResponse({ status: 201, description: 'The company has been successfully created.' })
  async create(@Body() data: any) {
    return this.companiesService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all companies' })
  async findAll() {
    return this.companiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a company by ID' })
  async findOne(@Param('id') id: string) {
    return this.companiesService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a company' })
  async update(@Param('id') id: string, @Body() data: any) {
    return this.companiesService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a company' })
  async remove(@Param('id') id: string) {
    return this.companiesService.remove(id);
  }
}
