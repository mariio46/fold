'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import useLoading from '@/hooks/useLoading';
import { Brands } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { SyntheticEvent, useState } from 'react';

export default function ProductModalCreate({ brands }: { brands: Brands[] }) {
    const [open, setOpen] = useState(false);
    const { loading, startLoading, stopLoading } = useLoading();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [brand, setBrand] = useState('');
    const router = useRouter();

    const handleClick = () => {
        setOpen(!open);
    };

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            startLoading();
            await axios.post('/api/products', {
                name: name,
                price: Number(price),
                brand_id: Number(brand),
            });
            setName('');
            setPrice('');
            setBrand('');
            router.refresh();
            handleClick();
        } catch (error: any) {
            console.log(error.response);
        } finally {
            stopLoading();
        }
    };

    return (
        <>
            <Button variant={'outline'} onClick={handleClick}>
                New Product
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add new product</DialogTitle>
                        <DialogDescription>This action will add new product.</DialogDescription>
                    </DialogHeader>
                    <form className='space-y-4' onSubmit={submit}>
                        <div>
                            <Label htmlFor='name'>Name</Label>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='mt-1'
                                type='text'
                                id='name'
                                name='name'
                                autoFocus
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor='price'>Price</Label>
                            <Input
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className='mt-1'
                                type='text'
                                id='price'
                                name='price'
                                required
                            />
                        </div>
                        <div>
                            <Label className='mb-1' htmlFor='brand'>
                                Brand
                            </Label>
                            <Select name='brand' value={brand} onValueChange={(value) => setBrand(value)}>
                                <SelectTrigger className='mt-1'>
                                    <SelectValue placeholder='Select a brand' />
                                </SelectTrigger>
                                <SelectContent id='brand'>
                                    <SelectGroup>
                                        <SelectLabel>Brands</SelectLabel>
                                        {brands.map((brand, i) => (
                                            <SelectItem key={i} value={brand.id.toString()}>
                                                {brand.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='flex items-center justify-end gap-x-2'>
                            <Button variant={'outline'} type='button' onClick={handleClick}>
                                Cancel
                            </Button>
                            <Button
                                type='submit'
                                disabled={name === '' ? true : price === '' ? true : brand === '' ? true : loading}>
                                {loading ? 'Saving...' : 'Save'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
