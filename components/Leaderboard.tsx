import { createArrayOfSize } from "@/public/functions/logic";
import { ReactNode } from "react";

interface Props {
  rows: number;
  cols: number;
  generateCell: (i: number, j: number) => ReactNode;
}

export default function Leaderboard({ rows, cols, generateCell }: Props) {
  return (
    <div className={`grid grid-cols-${cols} grid-flow-col`}>
    {
      createArrayOfSize(cols).map((_,i) => (
        <table key={i}>
          <tbody>
            {
              createArrayOfSize(rows).map((_,j) => generateCell(i, j))
            }
          </tbody>
        </table>
    ))}
    </div>
  )
}