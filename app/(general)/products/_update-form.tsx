'use client';

import { Button } from '@/components/ui/button';
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
import { Brands, Products } from '@/types';
import { DialogClose } from '@radix-ui/react-dialog';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { SyntheticEvent, useState } from 'react';

interface PropsType {
    brands: Brands[];
    product: Products;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function ProductUpdateForm({ brands, product, open, setOpen }: PropsType) {
    const { loading, startLoading, stopLoading } = useLoading();
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [brand, setBrand] = useState(product.brand_id);
    const router = useRouter();

    const update = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            startLoading();
            await axios.patch(`/api/products/${product.id}`, {
                name: name,
                price: Number(price),
                brand_id: Number(brand),
            });
            router.refresh();
            setOpen(false);
        } catch (error: any) {
            console.log(error.response);
        } finally {
            stopLoading();
        }
    };

    return (
        <form className='space-y-4' onSubmit={update}>
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
                    onChange={(e) => setPrice(Number(e.target.value))}
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
                <Select name='brand' value={brand.toString()} onValueChange={(value) => setBrand(Number(value))}>
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
                <DialogClose asChild>
                    <Button variant={'outline'} type='button'>
                        Cancel
                    </Button>
                </DialogClose>
                <Button type='submit' disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                </Button>
            </div>
        </form>
    );
}
