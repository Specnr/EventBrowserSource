import { GET_STATS_URL } from "@/public/functions/constants";
import { StatsResult } from "@/public/interfaces/Stats";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  if (!searchParams.has("names") || !searchParams.has("start")) {
    return new Response(`Invalid params`, {
      status: 400,
    })
  }

  const names = (searchParams.get('names') as string).split(",").map(n => n.trim())
  const start = parseInt(searchParams.get('start') as string)

  const stats = await Promise.all(
    names.map(async p => ({
      stats: (await fetch(GET_STATS_URL(p, start)).then((res) => res.json())) as StatsResult,
      nickname: p
    }))
  )

  return Response.json(stats)
}