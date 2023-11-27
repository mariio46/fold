'use client';

import { DropdownDialog } from '@/components/dropdown-dialog';
import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Products } from '@/types';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProductOption({ product }: { product: Products }) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleDelete = async (id: number) => {
        await axios.delete(`/api/products/${id}`);
        router.refresh();
        handleOpen();
    };

    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className='h-7' variant='outline' size='icon'>
                        <Icon name={'IconDots'} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-56'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href={'#'}>
                            <Icon className='mr-2' name={'IconFileSearch'} />
                            Details
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={'#'}>
                            <Icon className='mr-2' name={'IconPencil'} />
                            Edit
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    <DropdownDialog
                        title='Are you absolutely sure?'
                        trigger_text='Delete'
                        description={`This action cannot be undone. This will permanently delete ${product.name} and remove the data from our
                        servers.`}
                        variants={'destructive'}
                        cancel_text='Cancel'
                        submit_text='Delete'
                        icon='IconTrash'
                        action={() => handleDelete(product.id)}
                    />
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
