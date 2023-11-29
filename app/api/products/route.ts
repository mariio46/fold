import { PrismaClient, products } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    const products = await prisma.products.findMany({
        select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            brand_id: true,
            brands: true,
        },
    });
    return NextResponse.json({ products });
}

export async function POST(request: NextRequest) {
    const { name, slug, price, brand_id }: products = await request.json();
    const product = await prisma.products.create({
        data: {
            name,
            slug,
            price,
            brand_id,
        },
    });
    return NextResponse.json(product, { status: 201 });
}
