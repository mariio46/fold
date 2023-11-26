'use client';

import { cn } from '@/lib/utils';
import type { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkType {
    href: Route | URL;
    className?: string;
    children: React.ReactNode;
}

export default function NavLink({ href, className, children, ...props }: NavLinkType) {
    const pathname = usePathname();
    const active = pathname === href;
    return (
        <Link
            href={href}
            className={cn(
                'font-semibold text-muted-foreground hover:text-foreground',
                active ? 'font-medium text-foreground' : '',
                className,
            )}
            {...props}>
            {children}
        </Link>
    );
}
