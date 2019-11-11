import React from 'react'

type GridProps = {
  cols: number
  rows: number
}
export const Grid: React.FC<GridProps> = ({ cols, rows, children }) => {
  return (
    <div
      className="Grid"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`
      }}
    >
      {children}
    </div>
  )
}

type CellProps = {
  x: number
  y: number
}

export const GridCell: React.FC<CellProps> = ({ x, y, children }) => {
  const style = {
    gridArea: `${y + 1} / ${x + 1} / ${y + 2} / ${x + 2}`
  }
  return (
    <div className="GridCell" style={style}>
      {children}
    </div>
  )
}
