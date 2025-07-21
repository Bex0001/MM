import { Controller, Post, Body, UseGuards, Request, Get, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  async register(@Body() body: any) {
    return this.authService.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('me')
  @ApiOperation({ summary: 'Get current user profile (JWT)' })
  async me(@Request() req: any) {
    return req.user;
  }

  @Get()
  @ApiOperation({ summary: 'Get all users (admin only)' })
  async findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID (admin only)' })
  async findOne(@Param('id') id: string) {
    return this.authService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by ID (admin only)' })
  async update(@Param('id') id: string, @Body() data: any) {
    return this.authService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID (admin only)' })
  async remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}
