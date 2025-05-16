import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Guitar Shop',
  description: 'Your premium online guitar store',
};

export default function ElectricLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={`${inter.className} container mx-auto px-4 py-8`}>
      {children}
    </main>
  );
}