import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const users = await prisma.users.findMany({
        include: {
            _count: {
                select: { todos: true },
            },
        },
    });
    return NextResponse.json(users);
}
