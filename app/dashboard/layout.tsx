import { Suspense } from 'react'
import type { Metadata } from 'next'
import Navigation from '../components/Navigation'
import { PropsWithChildren } from 'react'
import DashboardSkeleton from '../components/DashboardSkeleton'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pl-16 md:pl-64 pt-0 min-h-screen">
        <div className="max-w-6xl mx-auto p-4 md:p-8">
          <Suspense fallback={<DashboardSkeleton />}>{children}</Suspense>
        </div>
      </main>
    </div>
  )
}
