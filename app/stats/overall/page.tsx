"use client";

import { Spinner } from "@/components/Spinner";
import { formatSplitTime, useEventStats } from "@/public/functions/stats";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function OverallStats({ event }: { event: string }) {
  const { data, error, isLoading } = useEventStats(event);

  if (isLoading) {
    return <Spinner />;
  }

  if (!data?.overall) {
    return <h1>{error?.message || "Unable to load event stats!"}</h1>;
  }

  return (
    <main className="space-y-4 p-2">
      <header className="text-center">
        <h1 className="player-name text-xl font-bold">Overall Event Stats</h1>
        <p className="player-score">{data.overall.runCount.toLocaleString("en-US")} total runs</p>
      </header>
      <table className="w-full text-center tabular-nums">
        <thead>
          <tr className="player-name">
            <th scope="col" className="px-2 py-1 text-left">Split</th>
            <th scope="col" className="px-2 py-1">Count</th>
            <th scope="col" className="px-2 py-1">Average</th>
            <th scope="col" className="px-2 py-1">Best</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data.overall.splits).map(([split, { count, avgMs, bestMs }]) => (
            <tr key={split}>
              <th scope="row" className="player-name px-2 py-1 text-left font-normal capitalize">
                {split.replace(/_/g, " ")}
              </th>
              <td className="player-score px-2 py-1">{count.toLocaleString("en-US")}</td>
              <td className="player-score px-2 py-1">{formatSplitTime(avgMs)}</td>
              <td className="player-score px-2 py-1">{formatSplitTime(bestMs)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

function BrowserSource() {
  const event = useSearchParams().get("e")?.trim();
  return event ? <OverallStats event={event} /> : <h1>Invalid Params!</h1>;
}

export default function OverallStatsPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <BrowserSource />
    </Suspense>
  );
}
