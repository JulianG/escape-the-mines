import React from 'react'
import { Coords, solve, getNeighbourCoords, Direction } from './escape-the-mines'

export function useEscapeTheMines(
  caveMap: readonly boolean[][],
  start: Coords,
  exit: Coords
) {
  const path: readonly Coords[] = React.useMemo(() => {
    const instructions = solve(caveMap, start, exit)
    return convertInstructionstoPath(start, instructions)
  }, [caveMap, start, exit])

  return { miner: useArrayIterator(path, 500) }
}

function convertInstructionstoPath(start: Coords, instructions: readonly Direction[]) {
  return instructions.reduce(
    (acc, direction) => {
      const last: Coords = acc[acc.length - 1]
      acc.push(getNeighbourCoords(last, direction))
      return acc
    },
    [start]
  )
}

/// more hooks!

function useArrayIterator<T>(arr: readonly T[], interval: number) {
  const currentIndex = useCounter(0, Math.max(0, arr.length - 1), interval)
  return arr[currentIndex]
}

function useCounter(start: number, end: number, interval: number) {
  const [current, setCurrent] = React.useState(start)
  React.useEffect(() => {
    const handle = setInterval(() => {
      setCurrent(current => (current < end ? current + 1 : current))
    }, interval)
    return () => clearInterval(handle)
  }, [start, end, interval])
  return current
}
