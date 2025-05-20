import type { Metadata } from 'next'
import { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default function DashboardLayout({ children }: PropsWithChildren) {
  return <>{children}</>
}
