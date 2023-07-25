import { Calendar } from '/src/hooks/useCalendarQuery'
import { Favicon } from '/src/res/Favicon'

const setFavicon = (calendar: Calendar | undefined) => {
  const existingFavicon = document.head.querySelector<HTMLLinkElement>('link[rel="icon"]')
  if (existingFavicon) {
    const faviconSvgString = Favicon(calendar)
    existingFavicon.href = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(faviconSvgString)
  }
}

export default setFavicon
