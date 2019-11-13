import React from 'react'
import { Direction } from './escape-the-mines'

export const Wall: React.FC = ({ children }) => <div className="Wall">{children}</div>
export const Path: React.FC = ({ children }) => <div className="Path">{children}</div>

type MinerProps = {
  direction: Direction
}
export const Miner: React.FC<MinerProps> = ({ direction }) => (
  <div className="Miner">
    <div
      className="svg-wrapper"
      style={useTranslationReset(getInitialTransform(direction))}
    >
      {minerSVG}
    </div>
  </div>
)

export const Exit = () => (
  <div className="Exit">
    <img src="./tiles/exit.png" alt="exit" />
  </div>
)

export const MinerInExit: React.FC<MinerProps> = ({ direction }) => (
  <div className="Exit">
    <div
      className="svg-wrapper"
      style={useTranslationReset(getInitialTransform(direction))}
    >
      {minerSVG}
    </div>
  </div>
)

function useTranslationReset(initialStyle: React.CSSProperties) {
  const [style, setStyle] = React.useState(initialStyle)
  React.useEffect(() => {
    const handle = window.setTimeout(() => {
      setStyle({
        transform: 'translate(0, 0)'
      })
    }, 50)
    return () => window.clearTimeout(handle)
  }, [])
  return style
}

function getInitialTransform(direction: Direction) {
  switch (direction) {
    case 'down':
      return { transform: 'translate(0, -8rem)' }
    case 'up':
      return { transform: 'translate(0, 8rem)' }
    case 'right':
      return { transform: 'translate(-8rem, 0)' }
    case 'left':
      return { transform: 'translate(8rem, 0)' }
    case '':
      return { transform: 'translate(0, 0)' }
  }
}

// https://svg2jsx.com/
const minerSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0"
    y="0"
    enableBackground="new 0 0 512 512"
    version="1.1"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
  >
    <circle cx="256.004" cy="256.004" r="246.855" fill="#F7B239"></circle>
    <path
      fill="#E09B2D"
      d="M126.308 385.694c-88.802-88.802-95.799-228.426-20.999-325.242A249.184 249.184 0 0081.45 81.45c-96.401 96.401-96.401 252.698 0 349.099s252.698 96.401 349.099 0a249.34 249.34 0 0020.999-23.858c-96.815 74.801-236.44 67.803-325.24-20.997z"
    ></path>
    <path
      fill="#FFF"
      d="M127.911 273.724h248.868c0 13.968-2.306 27.4-6.551 39.941H134.462c-4.246-12.541-6.551-25.973-6.551-39.941z"
    ></path>
    <path
      fill="#A81004"
      d="M134.462 313.665h235.765c-8.369 24.716-24.289 45.931-45.016 60.924-8.71-14.676-24.716-24.509-43.027-24.509a49.746 49.746 0 00-29.84 9.882 49.788 49.788 0 00-29.852-9.882c-18.299 0-34.317 9.833-43.015 24.509-20.726-14.994-36.646-36.208-45.015-60.924z"
    ></path>
    <path
      fill="#F95428"
      d="M282.184 350.08c18.311 0 34.317 9.833 43.027 24.509-20.483 14.834-45.662 23.569-72.867 23.569s-52.384-8.735-72.867-23.569c8.698-14.676 24.716-24.509 43.015-24.509a49.782 49.782 0 0129.852 9.882 49.748 49.748 0 0129.84-9.882z"
    ></path>
    <path d="M256.001 0C114.841 0 0 114.841 0 255.999 0 397.159 114.841 512 256.001 512 397.159 512 512 397.159 512 255.999 512 114.841 397.159 0 256.001 0zm0 493.701c-131.069 0-237.702-106.632-237.702-237.702 0-131.068 106.632-237.7 237.702-237.7 131.068 0 237.7 106.632 237.7 237.7 0 131.069-106.633 237.702-237.7 237.702z"></path>
    <path d="M146.725 238.682c18.666 0 33.852-15.186 33.852-33.852s-15.186-33.852-33.852-33.852-33.852 15.186-33.852 33.852 15.185 33.852 33.852 33.852zM365.277 170.979c-18.666 0-33.852 15.186-33.852 33.852s15.186 33.852 33.852 33.852 33.852-15.186 33.852-33.852-15.187-33.852-33.852-33.852zM376.778 264.574H127.911a9.15 9.15 0 00-9.15 9.15c0 14.662 2.367 29.087 7.034 42.876 8.934 26.382 25.643 48.999 48.316 65.4 22.86 16.557 49.914 25.309 78.233 25.309 28.32 0 55.373-8.752 78.23-25.305 22.677-16.405 39.387-39.021 48.319-65.402 4.667-13.788 7.034-28.214 7.034-42.875a9.15 9.15 0 00-9.149-9.153zm-9.508 18.299a114.819 114.819 0 01-3.809 21.642H141.226a114.885 114.885 0 01-3.809-21.642H367.27zm-174.704 89.439c7.649-8.21 18.499-13.083 29.925-13.083 8.87 0 17.302 2.79 24.385 8.069a9.149 9.149 0 0010.934 0c7.082-5.279 15.51-8.069 24.372-8.069 11.421 0 22.274 4.871 29.932 13.085-17.972 10.947-38.454 16.694-59.772 16.694-21.318 0-41.8-5.747-59.776-16.696zm134.455-10.761c-11.137-12.9-27.534-20.621-44.838-20.621-10.623 0-20.819 2.772-29.84 8.066-9.021-5.296-19.221-8.066-29.852-8.066-17.312 0-33.709 7.723-44.83 20.616-12.623-10.71-22.68-23.855-29.665-38.732H356.69c-6.985 14.88-17.043 28.026-29.669 38.737z"></path>
    <g fill="#FFF">
      <circle cx="150.48" cy="200.216" r="9.15"></circle>
      <circle cx="368.849" cy="200.216" r="9.15"></circle>
    </g>
  </svg>
)
