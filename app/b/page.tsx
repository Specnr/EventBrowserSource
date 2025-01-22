"use client"
import Leaderboard from '@/components/Leaderboard'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

export default function BrowserSourcePage() {
  const sp = useSearchParams()
  
  const eventId = sp.get("e")
  const rows = sp.get("r")
  const cols = sp.get("c")

  if (!eventId || !rows || !cols || isNaN(+rows) || isNaN(+cols) || !Number.isInteger(+rows) || !Number.isInteger(+cols)) {
    return <h1>Invalid Params!</h1>
  }

  return (
    <Suspense>
      <Leaderboard
        eventId={eventId}
        rows={+rows}
        cols={+cols}
      />
    </Suspense>
  );
}
