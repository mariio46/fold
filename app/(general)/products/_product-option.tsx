'use client';

import { DropdownDialog } from '@/components/dropdown-dialog';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DotsHorizontalIcon, IdCardIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Brands = {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
};

type Products = {
    id: number;
    name: string;
    price: number;
    brand_id: number;
    brand: Brands;
};

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
                        <DotsHorizontalIcon className='h-3.5 w-3.5' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-56'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href={'#'}>
                            <IdCardIcon className='mr-2' />
                            Details
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={'#'}>
                            <Pencil1Icon className='mr-2' />
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
                        action={() => handleDelete(product.id)}
                    />
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
