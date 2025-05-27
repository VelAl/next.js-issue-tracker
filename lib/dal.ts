// Module stands for data access layer

import { db } from '@/db'
import { getSession } from './auth'
import { eq } from 'drizzle-orm'
import { cache } from 'react'
import { issues, users } from '@/db/schema'
import { mockDelay } from './utils'
// import { mockDelay } from './utils'

//____CURRENT_USER______________________________________
export const getCurrentUser = cache(async () => {
  const session = await getSession()
  if (!session) return null

  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, session.userId))

    return result[0] ? { id: result[0].id, email: result[0].email } : null
  } catch (error) {
    console.error('Error getting user by ID:', error)
    return null
  }
})

//____GET_USER_BY_EMAIL_________________________________
export const getUserByEmail = async (email: string) => {
  try {
    const result = await db.select().from(users).where(eq(users.email, email))
    return result[0] || null
  } catch (error) {
    console.error('Error getting user by email:', error)
    return null
  }
}

//____GET_ISSUES________________________________________
export async function getIssues() {
  try {
    const result = await db.query.issues.findMany({
      with: { user: true },
      orderBy: (issues, { desc }) => [desc(issues.createdAt)],
    })
    return result
  } catch (error) {
    console.error('Error fetching issues:', error)
    throw new Error('Failed to fetch issues')
  }
}

//____GET_ISSUE_________________________________________
export async function getIssue(id: number) {
  try {
    await mockDelay(2000)

    const result = await db.query.issues.findFirst({
      where: eq(issues.id, id),
      with: { user: true },
    })
    return result
  } catch (error) {
    console.error(`Error fetching issue ${id}:`, error)
    throw new Error('Failed to fetch issue')
  }
}
