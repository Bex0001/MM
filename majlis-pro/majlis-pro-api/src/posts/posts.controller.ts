import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({ status: 201, description: 'The post has been successfully created.' })
  async create(@Body() data: any) {
    return this.postsService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  async findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by ID' })
  async findOne(@Param('id') id: string) {
    return this.postsService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a post' })
  async update(@Param('id') id: string, @Body() data: any) {
    return this.postsService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post' })
  async remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
