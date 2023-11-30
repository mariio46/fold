import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const figtree = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: `${process.env.APP_NAME}`,
    description: 'NextJS 13 & ShadcnUI CRUD using prisma & local database',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body className={cn('font-sans antialiased', figtree.className)}>{children}</body>
        </html>
    );
}
