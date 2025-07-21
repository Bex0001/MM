import './globals.css';
import type { Metadata } from 'next';
import { ReactQueryProvider } from '@/hooks/use-react-query';

export const metadata: Metadata = {
  title: 'Majlis Pro',
  description: 'منصة المجالس الاحترافية للأعمال',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-background min-h-screen">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
