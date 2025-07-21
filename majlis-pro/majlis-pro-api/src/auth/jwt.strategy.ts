import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'changeme',
    });
  }

  async validate(payload: any) {
    const user = await this.prisma.user.findUnique({ 
      where: { id: payload.sub },
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
      },
    });
    if (!user || !user.isActive) {
      return null;
    }
    return user;
  }
}
