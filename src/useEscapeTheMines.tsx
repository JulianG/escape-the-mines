import React from 'react'
import { Coords, solve, getNeighbourCoords, Direction } from './escape-the-mines'

export function useEscapeTheMines(
  caveMap: readonly boolean[][],
  start: Coords,
  exit: Coords,
  interval: number,
  delay: number
) {
  const instructions = React.useMemo(
    () => solve(caveMap, start, exit), //
    [caveMap, start, exit]
  )
  const path: readonly Coords[] = React.useMemo(() => {
    return convertInstructionstoPath(start, instructions)
  }, [start, instructions])

  const currentIndex = useCounter(0, Math.max(0, path.length - 1), interval, delay)
  const prevIndex = currentIndex ? currentIndex - 1 : -1
  const direction: Direction = prevIndex >= 0 ? instructions[prevIndex] : ''
  return { miner: path[currentIndex], direction }
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

function useCounter(start: number, end: number, interval: number, delay: number) {
  const [current, setCurrent] = React.useState(start)
  React.useEffect(() => {

    let handle: number | undefined
    setTimeout(() => {
      handle = window.setInterval(() => {
        setCurrent(current => (current < end ? current + 1 : current))
      }, interval)
    }, delay)
    
    return () => clearInterval(handle)
  }, [start, end, interval, delay])
  return current
}
