import { msToTime } from "@/public/functions/logic";
import { PlayerRanking } from "@/public/interfaces/Rankings"

interface Props {
  place: number;
  player?: PlayerRanking;
  unrankedPlayer?: { uuid: string; nickname: string };
  applyPlaceStyle: boolean
}

export const PlayerEntry = ({ place, player, unrankedPlayer, applyPlaceStyle }: Props) => {
  let placeStyle = {}
  if (!applyPlaceStyle) {
    placeStyle = {}
  } else if (place === 1) {
    placeStyle = { color: "gold" }
  } else if (place === 2) {
    placeStyle = { color: "silver" }
  } else if (place === 3) {
    placeStyle = { color: "#fa7900" }
  }

  return (
    <div className="grid grid-cols-4 grid-rows-[auto_min-content] text-center">
      <span className="row-span-2 player-place">{place}.</span>
      <span style={placeStyle} className="col-span-3 player-name">{player ? player.nickname : unrankedPlayer!.nickname}</span>
      <span className="col-span-3 player-score">
        {
          `${player ? player.totalPoints : 0} - ${player ? msToTime(player.completions[0].time) : "N/A"}`
        }
      </span>
    </div>
  )
}