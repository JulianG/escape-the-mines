import React from 'react'
import './App.css'
import { EscapeTheMines } from './EscapeTheMines'
import { Coords } from './escape-the-mines'

const caveMap = [
  [true, true, false, true, true],
  [false, true, false, true, false],
  [false, true, true, true, false],
  [false, true, false, true, true],
  [true, true, false, false, true]
]

const miner: Coords = [0, 0]
const exit: Coords = [4, 4]

const App: React.FC = () => {
  return (
    <>
      <EscapeTheMines caveMap={caveMap} miner={miner} exit={exit} />
    </>
  )
}

export default App
