import { NextResponse } from 'next/server'
import { encryptSecretKey } from '@/crypto';

export async function POST(request: Request) {
    try {
        const { secretKey } = await request.json()
        const encryptedSecretKey = encryptSecretKey(secretKey);
        return NextResponse.json({ encryptedSecretKey })
    } catch (error) {
        console.error(error);
        return NextResponse.error()
    }
};