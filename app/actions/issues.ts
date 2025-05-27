'use server'

import { db } from '@/db'
import { issues } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { getCurrentUser } from '@/lib/dal'
import { z } from 'zod'
import { mockDelay } from '@/lib/utils'

// Define Zod schema for issue validation
const IssueSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),

  description: z.string().optional().nullable(),

  status: z.enum(['backlog', 'todo', 'in_progress', 'done'], {
    errorMap: () => ({ message: 'Please select a valid status' }),
  }),

  priority: z.enum(['low', 'medium', 'high'], {
    errorMap: () => ({ message: 'Please select a valid priority' }),
  }),
  userId: z.string().min(1, 'User ID is required'),
})

export type T_Issue = z.infer<typeof IssueSchema>

export type ActionResponse = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
  error?: string
}

export const createIssue = async (data: T_Issue): Promise<ActionResponse> => {
  try {
    // Security check - ensure user is authenticated
    const user = await getCurrentUser()
    if (!user) {
      return {
        success: false,
        message: 'Unauthorized access',
        error: 'Unauthorized',
      }
    }

    // Validate with Zod
    const { data: validatedData, success, error } = IssueSchema.safeParse(data)
    if (!success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: error.flatten().fieldErrors,
      }
    }

    // Create issue with validated data
    await db.insert(issues).values({
      title: validatedData.title,
      description: validatedData.description || null,
      status: validatedData.status,
      priority: validatedData.priority,
      userId: validatedData.userId,
    })

    return { success: true, message: 'Issue created successfully' }
  } catch (error) {
    console.error('Error creating issue:', error)
    return {
      success: false,
      message: 'An error occurred while creating the issue',
      error: 'Failed to create issue',
    }
  }
}

export async function updateIssue(
  id: number,
  data: Partial<T_Issue>
): Promise<ActionResponse> {
  try {
    // Security check - ensure user is authenticated
    await mockDelay(100)

    const user = await getCurrentUser()
    if (!user) {
      return {
        success: false,
        message: 'Unauthorized access',
        error: 'Unauthorized',
      }
    }

    // Allow partial validation for updates
    const UpdateIssueSchema = IssueSchema.partial()
    const {
      data: validData,
      success,
      error,
    } = UpdateIssueSchema.safeParse(data)

    if (!success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: error.flatten().fieldErrors,
      }
    }

    // Type safe update object with validated data
    const updateData: Record<string, unknown> = {}

    if (validData.title) updateData.title = validData.title
    if (validData.description) updateData.description = validData.description
    if (validData.status) updateData.status = validData.status
    if (validData.priority) updateData.priority = validData.priority

    // Update issue
    await db.update(issues).set(updateData).where(eq(issues.id, id))

    return { success: true, message: 'Issue updated successfully' }
  } catch (error) {
    console.error('Error updating issue:', error)
    return {
      success: false,
      message: 'An error occurred while updating the issue',
      error: 'Failed to update issue',
    }
  }
}

export async function deleteIssue(id: number) {
  try {
    await mockDelay(2000)

    // Security check - ensure user is authenticated
    const user = await getCurrentUser()
    if (!user) {
      throw new Error('Unauthorized')
    }

    // Delete issue
    await db.delete(issues).where(eq(issues.id, id))

    return { success: true, message: 'Issue deleted successfully' }
  } catch (error) {
    console.error('Error deleting issue:', error)
    return {
      success: false,
      message: 'An error occurred while deleting the issue',
      error: 'Failed to delete issue',
    }
  }
}
