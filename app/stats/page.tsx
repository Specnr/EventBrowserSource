"use client"
import StatsLeaderboard from '@/components/StatsLeaderboard'
import { Spinner } from '@/components/Spinner'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function BrowserSource() {
  const sp = useSearchParams()
  
  const event = sp.get("e")
  const rows = sp.get("r")
  const cols = sp.get("c")
  const statsEventDay = sp.get("sed") || "0"

  if (!event || !rows || !cols || isNaN(+rows) || isNaN(+cols) || !Number.isInteger(+rows) || !Number.isInteger(+cols)) {
    return <h1>Invalid Params!</h1>
  }

  return (
    <StatsLeaderboard
      event={event}
      rows={+rows}
      cols={+cols}
      statsEventDay={+statsEventDay}
    />
  )
}

export default function NetherStatsPage() {

  return (
    <Suspense fallback={<Spinner />}>
      <BrowserSource />
    </Suspense>
  );
}
