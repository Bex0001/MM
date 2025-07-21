import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    // إذا لم يتم إرسال authorId، نستخدم ID تجريبي ثابت
    const authorId = data.authorId || 'test-author-id-001';
    // إذا لم يتم إرسال content، نستخدم قيمة افتراضية
    const content = data.content || data.title || 'منشور بدون محتوى';
    return this.prisma.post.create({
      data: {
        ...data,
        authorId,
        content,
        postType: data.postType || 'TEXT',
        mediaUrls: data.mediaUrls || [],
        // companyId و industryId فقط إذا تم توفيرهم
        ...(data.companyId ? { companyId: data.companyId } : {}),
        ...(data.industryId ? { industryId: data.industryId } : {}),
      },
    });
  }

  async findAll() {
    return this.prisma.post.findMany();
  }

  async findById(id: string) {
    return this.prisma.post.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    return this.prisma.post.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.post.delete({ where: { id } });
  }
}
