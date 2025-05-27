// This handles requests like /api/posts/2023/01/hello-world.

import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  const slug = params.slug

  return NextResponse.json({
    slug,
    message: `Handling route: /api/posts/${slug.join('/')}`,
  })
}
