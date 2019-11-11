import React from 'react'

export const Wall: React.FC = ({ children }) => <div className="Wall">{children}</div>
export const Path: React.FC = ({ children }) => <div className="Path">{children}</div>

export const Miner = () => (
  <div className="Miner">
    <img src="./tiles/cowboy.png" alt="miner" />
  </div>
)
export const Exit = () => (
  <div className="Exit">
    <img src="./tiles/exit.png" alt="exit" />
  </div>
)

export const MinerInExit = () => (
  <div className="Exit">
    <img src="./tiles/cowboy.png" alt="miner" />
  </div>
)
