import { Result } from "@/public/interfaces/Rankings";
import useSWR from "swr";
import { Spinner } from "./Spinner";
import { PlayerEntry } from "./PlayerEntry";
import { NICKNAME_CACHE, uuidToIGN } from "@/public/functions/player";
import { createArrayOfSize } from "@/public/functions/logic";

const fetcher = async (url: string) => {
  const data = (await fetch(url).then((res) => res.json())) as Result;
  const rankedPlayers = new Set(data.rankings.map(p => p.uuid));

  return {
    rankings: data.rankings.map(p => ({ ...p, nickname: NICKNAME_CACHE.get(p.uuid) || p.nickname })),
    unrankedPlayers: await Promise.all(
      data.event.whitelist
        .filter(p => !rankedPlayers.has(p))
        .map(async (p) => ({ uuid: p, nickname: await uuidToIGN(p) }))
    ),
  }
}

interface Props {
  eventId: string;
  rows: number;
  cols: number;
}

export default function Leaderboard({ eventId, rows, cols }: Props) {
  const { data, error, isLoading } = useSWR(
    `https://paceman.gg/api/cs/event?id=${eventId}`, fetcher, { refreshInterval: 30 * 1000, }
  )

  if (isLoading) {
    return <Spinner />
  }

  if (!data || error) {
    return <h1>Invalid event!</h1>
  }

  // TODO: make these guys have fixed width somehow
  // Idea: Prefetch the longest name, and put that as an invisible text element? Probably some better way
  return (
    <div className={`grid grid-cols-${cols} grid-flow-col`}>
    {
      createArrayOfSize(cols).map((_,i) => (
        <table key={i}>
          <tbody>
            {
              createArrayOfSize(rows).map((_,j) => {
                const playerIndex = (rows * i) + j
                if (playerIndex >= (data.rankings.length + data.unrankedPlayers.length)) {
                  return
                }

                if (playerIndex >= data.rankings.length) {
                  return (
                    <tr key={j}>
                      <td className="p-0">
                        <PlayerEntry
                          place={data.rankings.length + 1}
                          unrankedPlayer={data.unrankedPlayers[playerIndex - data.rankings.length]}
                          applyPlaceStyle={false}
                        />
                      </td>
                    </tr>
                  )
                }

                return (
                  <tr key={j}>
                    <td className="p-0">
                      <PlayerEntry
                        place={playerIndex + 1}
                        player={data.rankings[playerIndex]}
                        applyPlaceStyle={data.rankings.length >= 3}
                      />
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      ))
    }
    </div>
  )
}