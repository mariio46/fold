import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PrismaClient } from '@prisma/client';
import ProductModal from './_modal';
import { Metadata } from 'next';
import ProductOption from './_product-option';

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
    const data = await prisma.products.findMany({
        select: {
            id: true,
            name: true,
            price: true,
            brand_id: true,
            brand: true,
        },
    });
    return data;
}

export default async function Products() {
    const [products, brands] = await Promise.all([getProducts(), getBrands()]);
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
                            <ProductModal brands={brands} />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Brand</TableHead>
                                <TableHead />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product, i) => (
                                <TableRow key={product.id}>
                                    <TableCell className='font-medium'>{i + 1}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.brand.name}</TableCell>
                                    <TableCell className='text-end'>
                                        <ProductOption product={product} />
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
