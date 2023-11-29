import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const tag = request.nextUrl.searchParams.get('tag');
    if (!tag) {
        return NextResponse.json({ status: 400, message: 'Missing Tag Param' });
    }
    revalidateTag(tag);
    return NextResponse.json({ revalidate: true, time: Date.now() });
}
