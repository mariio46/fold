import { PrismaClient, Products } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const { name, price, brand_id }: Products = await request.json();
    const product = await prisma.products.create({
        data: {
            name,
            price,
            brand_id,
        },
    });
    return NextResponse.json(product, { status: 201 });
}
