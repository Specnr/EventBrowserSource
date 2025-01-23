"use client"
import NetherLeaderboard from '@/components/NetherLeaderboard'
import { Spinner } from '@/components/Spinner'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function BrowserSource() {
  const sp = useSearchParams()
  
  const eventId = sp.get("e")
  const rows = sp.get("r")
  const cols = sp.get("c")

  if (!eventId || !rows || !cols || isNaN(+rows) || isNaN(+cols) || !Number.isInteger(+rows) || !Number.isInteger(+cols)) {
    return <h1>Invalid Params!</h1>
  }

  return (
    <NetherLeaderboard
      eventId={eventId}
      rows={+rows}
      cols={+cols}
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
