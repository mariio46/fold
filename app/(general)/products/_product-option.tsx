'use client';

import { DropdownAlertDialog } from '@/components/dropdown-alert-dialog';
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
import useLoading from '@/hooks/useLoading';
import { Brands, Products } from '@/types';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ProductUpdateForm from './_update-form';

export default function ProductOption({ brands, product }: { brands: Brands[]; product: Products }) {
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const { loading, startLoading, stopLoading } = useLoading();
    const router = useRouter();

    const handleDelete = async (id: number) => {
        try {
            startLoading();
            await axios.delete(`/api/products/${id}`);
            await axios.post('/api/revalidate?tag=products');
            router.refresh();
            handleOpenAlertDialog();
        } catch (error: any) {
            console.log(error.response);
        } finally {
            stopLoading();
        }
    };

    const handleOpenAlertDialog = () => {
        setOpenAlertDialog(!openAlertDialog);
    };

    const handleOpenDialog = () => {
        setOpenDialog(!openDialog);
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
                    <DropdownDialog
                        open={openDialog}
                        setOpen={setOpenDialog}
                        trigger_text='Edit'
                        icon='IconPencil'
                        title={`Edit ${product.name}`}
                        description='Change the field that you need to update.'>
                        <ProductUpdateForm handleOpenDialog={handleOpenDialog} brands={brands} product={product} />
                    </DropdownDialog>
                    <DropdownMenuSeparator />

                    <DropdownAlertDialog
                        title='Are you absolutely sure?'
                        trigger_text='Delete'
                        description={`This action cannot be undone. This will permanently delete ${product.name} and remove the data from our
                        servers.`}
                        processing={loading}
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
