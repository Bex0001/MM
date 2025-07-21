import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ 
      where: { email },
      select: {
        id: true,
        email: true,
        phone: true,
        username: true,
        firstName: true,
        lastName: true,
        bio: true,
        avatar: true,
        coverImage: true,
        location: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        password: true,
      },
    });
    if (user && user.isActive && user.password && await bcrypt.compare(password, user.password)) {
      const { password: _pw, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return {
      access_token: this.jwtService.sign({ sub: user.id, email: user.email }),
      user,
    };
  }

  async register(data: any) {
    const hashed = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: { ...data, password: hashed },
    });
    return {
      access_token: this.jwtService.sign({ sub: user.id, email: user.email }),
      user,
    };
  }

  // CRUD الإداري للمستخدمين
  async findAll() {
    return this.prisma.user.findMany();
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return this.prisma.user.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
