import Link from 'next/link';
import type { Route } from 'next';
import { cn } from '@/lib/utils';

interface NavLinkType {
    href: Route | URL;
    className?: string;
    children: React.ReactNode;
}

export default function PrimaryLink({ href, className, children, ...props }: NavLinkType) {
    return (
        <Link
            href={href}
            className={cn('text-sm capitalize text-muted-foreground hover:text-foreground', className)}
            {...props}>
            {children}
        </Link>
    );
}
