// This handles requests like /api/search?q=nextjs&limit=5

import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  const limit = searchParams.get('limit') || '10'

  return NextResponse.json({
    message: `Searching for: ${query}`,
    limit: parseInt(limit),
  })
}
