import React from 'react'
import { Grid, GridCell } from './Grid'
import { Exit, Miner, Path, Wall, MinerInExit } from './grid-elements'
import { useEscapeTheMines } from './useEscapeTheMines'

import './EscapeTheMines.css'

type Props = {
  caveMap: readonly boolean[][]
  miner: readonly [number, number]
  exit: readonly [number, number]
}

export const EscapeTheMines: React.FC<Props> = ({
  caveMap,
  miner: initialMiner,
  exit
}) => {
  const { miner } = useEscapeTheMines(caveMap, initialMiner, exit)

  const cols = caveMap.length
  const rows = caveMap[0].length

  return (
    <>
      <h1>Escape the mines!</h1>
      <Grid cols={cols} rows={rows}>
        {caveMap.map((col, x) => {
          return col.map((_, y) => {
            const isExit = exit[0] === x && exit[1] === y
            const hasMiner = miner[0] === x && miner[1] === y

            let content = null
            if (isExit && hasMiner) content = <MinerInExit />
            else if (isExit) content = <Exit />
            else if (hasMiner) content = <Miner />

            const cell = caveMap[x][y] ? <Path>{content}</Path> : <Wall></Wall>
            return (
              <GridCell key={[x, y].toString()} x={x} y={y}>
                {cell}
              </GridCell>
            )
          })
        })}
      </Grid>
    </>
  )
}
