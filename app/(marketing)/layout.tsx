import type { Metadata } from 'next'
import { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: 'Home',
}

export default function MarketingLayout({ children }: PropsWithChildren) {
  return <>{children}</>
}
