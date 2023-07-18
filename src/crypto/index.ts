import crypto from 'crypto';

const SECRET = process.env.NEXT_PUBLIC_SECRET!;
const ENCRYPTION_ALGORITHM = process.env.NEXT_PUBLIC_ENCRYPTION_ALGORITHM!;

export const encryptSecretKey = (privateKey: string) => {
    const iv = Buffer.from(crypto.randomBytes(16));
    const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, Buffer.from(SECRET), iv);
    let encrypted = cipher.update(privateKey, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
};