import { Issue } from '@/db/schema'

export type T_IssueStatus = 'backlog' | 'todo' | 'in_progress' | 'done'
export type T_IssuePriority = 'low' | 'medium' | 'high'

export type IssueWithUser = Issue & {
  user: { id: string; email: string }
}
