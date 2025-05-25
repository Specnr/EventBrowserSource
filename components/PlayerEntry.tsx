import { ignToHead, NICKNAME_CACHE } from "@/public/functions/player";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

interface Props {
  place: number;
  name: string;
  scoreText: string;
  applyPlaceStyle?: boolean;
  hideImage?: boolean;
}

export const PlayerEntry = ({ place, name, scoreText, applyPlaceStyle, hideImage }: Props) => {
  const [scale, setScale] = useState(1);
  const textRef = useRef<HTMLSpanElement>(null);
  
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

  const displayName = NICKNAME_CACHE.get(name.toLowerCase()) || name;
  
  // Calculate appropriate scale to fit text without truncation
  useLayoutEffect(() => {
    if (textRef.current) {
      // Reset scale to check natural width
      setScale(1);
      
      // Wait for the next render cycle to measure accurate width
      setTimeout(() => {
        if (textRef.current) {
          const nameWidth = textRef.current.scrollWidth;
          const containerWidth = textRef.current.parentElement?.clientWidth || 0;
          
          // If text is wider than container, scale it down to fit
          if (nameWidth > containerWidth && containerWidth > 0) {
            // ADJUST THESE VALUES TO CONTROL SCALING AGGRESSIVENESS:
            // ----------------------------------------------------
            // Buffer factor: smaller = more aggressive scaling (0.9 = 90% of available width)
            const bufferFactor = 0.7;  // Reduced from 0.95 for more aggressive scaling
            
            // Minimum scale: smaller = allows more text compression (0.5 = 50% of original size)
            const minScale = 0.75;     // Reduced from 0.6 for more aggressive scaling
            // ----------------------------------------------------
            
            // Calculate the exact scale needed with the buffer
            const newScale = (containerWidth / nameWidth) * bufferFactor;
            
            // Apply scale with minimum limit
            setScale(Math.max(newScale, minScale));
          }
        }
      }, 0);
    }
  }, [displayName]);

  return (
    <div className="grid grid-cols-5 grid-rows-[auto_min-content] text-center">
      <span className="row-span-2 player-place">{place}.</span>
      <span className="row-span-2 player-place items-center align-middle">
      {
        !hideImage && (
          <Image
            alt="avatar"
            src={ignToHead(name)}
            width={35}
            height={35}
            unoptimized
            className="mx-auto mt-1"
          />
        )
      }
      </span>
      <span 
        style={placeStyle} 
        className="col-span-3 player-name flex items-center justify-center w-full overflow-hidden px-1"
      >
        <span 
          ref={textRef} 
          style={{ 
            transform: `scale(${scale})`, 
            transformOrigin: 'center', 
            width: scale < 1 ? '100%' : 'auto',
            // Add a slight horizontal padding when scaled to prevent edge clipping
            padding: scale < 1 ? '0 2px' : '0'
          }}
          className="text-center whitespace-nowrap"
          title={displayName}
        >
          {displayName}
        </span>
      </span>
      <span className="col-span-3 player-score">{scoreText}</span>
    </div>
  )
}