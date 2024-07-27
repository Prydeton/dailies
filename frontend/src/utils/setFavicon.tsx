import { Favicon } from '../res/Favicon'

const setFavicon = (fillPerecentage: number) => {
  const existingFavicon = document.head.querySelector<HTMLLinkElement>('link[rel="icon"]')
  if (existingFavicon) {
    existingFavicon.href = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(Favicon(fillPerecentage))}`
  }
}

export default setFavicon
