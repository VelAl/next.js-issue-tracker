//This handles requests like /api/users/123.

import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id

  // In a real app, fetch user data from a database
  const userData = {
    id,
    name: 'John Doe',
    email: 'john@example.com',
  }

  return NextResponse.json(userData)
}
