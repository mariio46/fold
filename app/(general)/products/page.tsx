import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { rupiahFormat } from '@/lib/helpers';
import { PrismaClient } from '@prisma/client';
import { Metadata } from 'next';
import ProductModalCreate from './_modal-create-form';
import ProductOption from './_product-option';
import { Products } from '@/types';

export const metadata: Metadata = {
    title: 'Products / Fold',
};

const prisma = new PrismaClient();

async function getBrands() {
    const data = await prisma.brands.findMany({
        select: {
            id: true,
            name: true,
        },
    });
    return data;
}

async function getProducts() {
    const res = await fetch(`${process.env.BASE_URL}/api/products`, {
        cache: 'force-cache',
        next: { tags: ['products'] },
    });
    const json = res.json();
    return json;
}

export default async function Products() {
    const [{ products }, brands] = await Promise.all([getProducts(), getBrands()]);
    return (
        <div className='mx-auto my-8 max-w-[1480px]'>
            <Card>
                <CardHeader>
                    <div className='flex items-start justify-between'>
                        <div className='flex flex-col space-y-1.5'>
                            <CardTitle>Products</CardTitle>
                            <CardDescription>All products in your website.</CardDescription>
                        </div>
                        <div>
                            <ProductModalCreate brands={brands} />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Brand</TableHead>
                                <TableHead />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product: Products, i: number) => (
                                <TableRow key={product.id}>
                                    <TableCell className='font-medium'>{i + 1}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.slug}</TableCell>
                                    <TableCell>{rupiahFormat(product.price)}</TableCell>
                                    <TableCell>{product.brands.name}</TableCell>
                                    <TableCell className='text-end'>
                                        <ProductOption brands={brands} product={product} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
