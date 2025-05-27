import { T_IssuePriority, T_IssueStatus } from '@/lib/types'

const statuses: { [key in T_IssueStatus]: string } = {
  backlog: 'Backlog',
  todo: 'Todo',
  in_progress: 'In Progress',
  done: 'Done',
}

const priorityLabel: { [key in T_IssuePriority]: string } = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

export const getStatusLabel = (status: T_IssueStatus) =>
  statuses[status] || status

export const getPriorityLabel = (priority: T_IssuePriority) =>
  priorityLabel[priority] || priority
