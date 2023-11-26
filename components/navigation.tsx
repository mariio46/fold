import Link from 'next/link';
import NavLink from './nav-link';

export default function Navigation() {
    return (
        <nav className='flex items-center justify-between border-b px-8 py-6 '>
            <div>
                <Link href={'/'}>
                    <h1 className='text-xl font-bold text-card-foreground'>Codex</h1>
                </Link>
            </div>
            <div className='flex items-center gap-x-6'>
                <NavLink href={'/'}>Home</NavLink>
                <NavLink href={'/users'}>Users</NavLink>
                <NavLink href={'/products'}>Products</NavLink>
            </div>
        </nav>
    );
}
