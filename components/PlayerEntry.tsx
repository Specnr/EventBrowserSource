import { ignToHead, NICKNAME_CACHE } from "@/public/functions/player";
import Image from "next/image";

interface Props {
  place: number;
  name: string;
  scoreText: string;
  applyPlaceStyle?: boolean;
  hideImage?: boolean;
}

export const PlayerEntry = ({ place, name, scoreText, applyPlaceStyle, hideImage }: Props) => {
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
      <span style={placeStyle} className="col-span-3 player-name inline-flex items-center mx-auto space-x-2">
        {
          !hideImage && (
            <Image
              alt="avatar"
              src={ignToHead(name)}
              width={20}
              height={20}
              unoptimized
            />
          )
        }
        <span>{NICKNAME_CACHE.get(name.toLowerCase()) || name}</span>
      </span>
      <span className="col-span-3 player-score">{scoreText}</span>
    </div>
  )
}