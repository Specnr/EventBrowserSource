"use client"
import RankingLeaderboard from '@/components/RankingLeaderboard'
import { Spinner } from '@/components/Spinner'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function BrowserSource() {
  const sp = useSearchParams()
  
  const event = sp.get("e")
  const rows = sp.get("r")
  const cols = sp.get("c")

  if (!event || !rows || !cols || isNaN(+rows) || isNaN(+cols) || !Number.isInteger(+rows) || !Number.isInteger(+cols)) {
    return <h1>Invalid Params!</h1>
  }

  return (
    <RankingLeaderboard
      event={event}
      rows={+rows}
      cols={+cols}
    />
  )
}

export default function BrowserSourcePage() {

  return (
    <Suspense fallback={<Spinner />}>
      <BrowserSource />
    </Suspense>
  );
}
