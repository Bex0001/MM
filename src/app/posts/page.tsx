import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { PostForm } from '@/components/forms/post-form';

async function fetchPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/posts`);
  if (!res.ok) throw new Error('فشل في جلب المنشورات');
  return res.json();
}

export default function PostsPage() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">المنشورات</h1>
      </div>
      <PostForm />
      {isLoading && <div>جاري التحميل...</div>}
      {error && <div className="text-red-500">{error.message}</div>}
      <div className="space-y-4">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((post: any) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title || 'بدون عنوان'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-700 rtl:text-right">{post.content || 'لا يوجد محتوى'}</div>
              </CardContent>
            </Card>
          ))
        ) : (
          !isLoading && <div className="text-gray-500">لا توجد منشورات بعد.</div>
        )}
      </div>
    </div>
  );
}
