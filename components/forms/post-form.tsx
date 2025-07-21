"use client";
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function PostForm({ onSuccess }: { onSuccess?: () => void }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: { title: string; content: string }) => {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setLoading(false);
      if (!res.ok) throw new Error('فشل في إضافة المنشور');
      return res.json();
    },
    onSuccess: () => {
      setTitle('');
      setContent('');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      onSuccess?.();
    },
  });

  return (
    <Card className="mb-6">
      <CardContent className="pt-6 flex flex-col gap-4">
        <input
          className="border rounded px-3 py-2 focus:outline-none focus:ring w-full rtl:text-right"
          placeholder="عنوان المنشور"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          className="border rounded px-3 py-2 focus:outline-none focus:ring w-full min-h-[80px] rtl:text-right"
          placeholder="محتوى المنشور"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <Button onClick={() => mutation.mutate({ title, content })} disabled={loading || !title || !content}>
          {loading ? 'جاري الإضافة...' : 'إضافة منشور'}
        </Button>
      </CardContent>
    </Card>
  );
}
