import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Berhasil logout' });
  
  response.cookies.set('token', '', { 
    expires: new Date(0),
    path: '/' 
  });
  
  return response;
}