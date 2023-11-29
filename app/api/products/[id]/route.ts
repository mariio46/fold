import { PrismaClient, products } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const { name, slug, price, brand_id }: products = await request.json();
    const product = await prisma.products.update({
        where: { id: Number(params.id) },
        data: { name, slug, price, brand_id },
    });
    return NextResponse.json(product, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const product: products = await prisma.products.delete({
        where: { id: Number(params.id) },
    });

    return NextResponse.json(product, { status: 200 });
}
