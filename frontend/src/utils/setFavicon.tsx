import type { Day } from '../types'
import { Favicon } from '/src/res/Favicon'

const setFavicon = () => {
  const day: Day = { date: '', tasks: [] }

  const existingFavicon = document.head.querySelector<HTMLLinkElement>('link[rel="icon"]')
  if (existingFavicon) {
    const faviconSvgString = Favicon(day)
    existingFavicon.href = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(faviconSvgString)}`
  }
}

export default setFavicon
