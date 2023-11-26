'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import ProductForm from './_form';

type Brands = {
    id: number;
    name: string;
};

export default function ProductModal({ brands }: { brands: Brands[] }) {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>
            <Button variant={'outline'} onClick={handleClick}>
                New Product
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className='sm:max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle>Add new product</DialogTitle>
                        <DialogDescription>This action will add new product.</DialogDescription>
                    </DialogHeader>
                    <ProductForm brands={brands} handleClick={handleClick} />
                </DialogContent>
            </Dialog>
        </>
    );
}
