import React from 'react';

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen bg-background">
      {children}
    </section>
  );
}
