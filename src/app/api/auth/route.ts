import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token || !token.value) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token.value, JWT_SECRET);

    if (typeof decoded === 'string') {
      return NextResponse.json(
        { message: 'Invalid token format' },
        { status: 401 }
      );
    }

    const { id, name, email } = decoded as JwtPayload;

    return NextResponse.json({
      user: { id, name, email }
    });
  } catch (error) {
    console.error('Auth verification error:', error);
    return NextResponse.json(
      { message: 'Authentication failed' },
      { status: 401 }
    );
  }
}
