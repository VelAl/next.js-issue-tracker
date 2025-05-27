import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()

  // Or for form data
  // const formData = await request.formData();
  // const name = formData.get('name');

  return NextResponse.json({
    received: body,
    success: true,
  })
}
