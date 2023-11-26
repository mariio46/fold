import { PrismaClient, Products } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const product: Products = await prisma.products.delete({
        where: {
            id: Number(params.id),
        },
    });

    return NextResponse.json(product, { status: 200 });
}
