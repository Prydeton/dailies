import { Calendar } from '/src/config/api'
import { Favicon } from '/src/res/Favicon'

const setFavicon = (calendar: Calendar | null) => {
  const existingFavicon = document.head.querySelector<HTMLLinkElement>('link[rel="icon"]')
  if (existingFavicon) {
    const faviconSvgString = Favicon(calendar)
    existingFavicon.href = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(faviconSvgString)
  }
}

export default setFavicon
