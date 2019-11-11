// Based on: https://www.redblobgames.com/pathfinding/a-star/introduction.html
// by @redblobgames

export type Coords = readonly [number, number]

export type Direction = 'up' | 'down' | 'left' | 'right' | ''

export function solve(caveMap: readonly boolean[][], miner: Coords, exit: Coords) {
  const prevCoordsMap = calculatePrevCoordsMap(caveMap, miner)
  const path = getPath(miner, exit, prevCoordsMap)
  return getInstructionsFromPath(path)
}

function compare(c0: Coords, [x1, y1]: Coords) {
  const [x0, y0] = c0
  return x0 === x1 && y0 === y1
}

function getInstructionsFromPath(path: readonly Coords[]) {
  return path.reduce<Direction[]>((acc, cur, index, arr) => {
    if (index < arr.length - 1) {
      acc.push(getDirection(cur, arr[index + 1]))
    }
    return acc
  }, [])
}

function calculatePrevCoordsMap(caveMap: readonly boolean[][], miner: Coords) {
  const getNeighbours = createGetNeighbours(caveMap)

  const frontier: Coords[] = [miner]
  const comeFrom: { [index: string]: Coords | null } = {
    [miner.toString()]: null
  }

  const isInComeFrom = (coords: Coords) => comeFrom.hasOwnProperty(coords.toString())

  while (frontier.length > 0) {
    let current = frontier.shift()
    getNeighbours(current!).forEach(next => {
      if (!isInComeFrom(next)) {
        frontier.unshift(next)
        comeFrom[next.toString()] = current!
      }
    })
  }
  return comeFrom
}

function createGetNeighbours(caveMap: readonly boolean[][]) {
  const height = caveMap[0].length
  const width = caveMap.length
  const isWalkable = ([x, y]: Coords) => caveMap[x] && caveMap[x][y]
  return ([x, y]: Coords) => {
    const n: Coords | null = y > 0 ? [x, y - 1] : null
    const s: Coords | null = y < height ? [x, y + 1] : null
    const w: Coords | null = x > 0 ? [x - 1, y] : null
    const e: Coords | null = x < width ? [x + 1, y] : null
    return ([n, s, w, e].filter(c => c !== null) as readonly Coords[]).filter(c =>
      isWalkable(c)
    )
  }
}

function getPath(
  start: Coords,
  goal: Coords,
  prevCoordsMap: { [index: string]: Coords | null }
) {
  const path: Coords[] = []
  let current: Coords = goal
  let count = 0
  while (compare(current, start) === false) {
    if (++count > 100) break
    path.push(current)
    const prev = prevCoordsMap[current.toString()]
    if (prev) current = prev
  }
  path.push(start)
  return path.reverse()
}

function getDirection([x0, y0]: Coords, [x1, y1]: Coords): Direction {
  if (x1 > x0) return 'right'
  if (x1 < x0) return 'left'
  if (y1 > y0) return 'down'
  if (y1 < y0) return 'up'
  return ''
}

export function getNeighbourCoords([x, y]: Coords, direction: Direction): Coords {
  switch (direction) {
    case 'up':
      return [x, y - 1]
    case 'down':
      return [x, y + 1]
    case 'left':
      return [x - 1, y]
    case 'right':
      return [x + 1, y]
    case '':
      return [x, y]
  }
}
