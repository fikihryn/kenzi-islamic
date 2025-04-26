// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies(); // ✅ await here

    // Clear the auth token
    cookieStore.set({
      name: 'token',
      value: '',
      httpOnly: true,
      path: '/',
      maxAge: 0, // Expires immediately
    });

    return NextResponse.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { message: 'Logout failed' },
      { status: 500 }
    );
  }
}
