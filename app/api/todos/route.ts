import { NextResponse } from 'next/server'

export async function GET() {
  const todos = [
    { id: 1, text: 'Learn Next.js', completed: false },
    { id: 2, text: 'Build an app', completed: false },
  ]

  return NextResponse.json(todos)
}

export async function POST(request: Request) {
  const data = await request.json()

  // Process the data (in a real app, would be saved to a DB)
  console.log('Received data:', data)

  return NextResponse.json(
    {
      message: 'Todo created successfully',
      todo: data,
    },
    { status: 201 }
  )
}

// Other HTTP methods can be implemented:
// export async function PUT(request: Request) { ... }
// export async function DELETE(request: Request) { ... }
// export async function PATCH(request: Request) { ... }
