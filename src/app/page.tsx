import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-3xl font-bold">مرحبًا بك في Majlis Pro</h1>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Link href="/posts" className="block bg-primary text-white rounded px-6 py-3 text-center hover:bg-primary/80 transition">المنشورات</Link>
        {/* أضف روابط أخرى هنا حسب الحاجة */}
      </div>
    </main>
  );
}
