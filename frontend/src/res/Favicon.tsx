import type { Day } from '../types'
import { calculateFillPercentage, lerp } from '/src/utils'

export const Favicon = (day: Day | undefined) => {
  const emptyY = 250
  const fullY = -250

  const calculateLiquidY = (day: Day | undefined) => {
    const fillPercentage = day ? calculateFillPercentage(day.tasks) : 0.5
    return lerp(emptyY, fullY, fillPercentage)
  }

  const liquidY = calculateLiquidY(day)

  return `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip)">
    <circle cx="256" cy="256" r="248.5" fill="#282A36" stroke="#F8F8F2" stroke-width="15"/>
    <mask id="mask" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="15" y="15" width="482" height="482">
      <path d="M497 256C497 389.101 389.101 497 256 497C122.899 497 15 389.101 15 256C15 122.899 122.899 15 256 15C389.101 15 497 122.899 497 256Z" fill="#282A36"/>
    </mask>
    <g mask="url(#mask)">
      <path style="transform: translateY(${liquidY}px)" d="M7.5 258.513C27.3122 257.56 46.662 253.052 65.4405 248.677C65.8325 248.585 66.2243 248.494 66.6157 248.403C88.4054 243.328 109.545 238.5 131.5 238.5C153.292 238.5 176.105 243.249 200.267 248.278L201.052 248.441C225.195 253.466 250.595 258.697 276 258.697C301.365 258.697 328.244 253.48 353.862 248.458L354.694 248.295C380.359 243.264 404.664 238.5 426.5 238.5C448.416 238.5 458.199 241.73 467.672 245.625C468.963 246.156 470.263 246.707 471.593 247.271C479.713 250.711 488.984 254.64 504.5 257.538V755.5H7.5V258.513Z" fill="#50FA7B" stroke="#F8F8F2" stroke-width="15"/>
    </g>
  </g>
  <defs>
    <clipPath id="clip">
      <rect width="512" height="512" fill="white"/>
    </clipPath>
  </defs>
</svg> 
`
}
