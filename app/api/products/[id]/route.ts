import { PrismaClient, Products } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const { name, price, brand_id } = await request.json();
    const product = await prisma.products.update({
        where: { id: Number(params.id) },
        data: { name, price, brand_id },
    });
    return NextResponse.json(product, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const product: Products = await prisma.products.delete({
        where: { id: Number(params.id) },
    });

    return NextResponse.json(product, { status: 200 });
}
