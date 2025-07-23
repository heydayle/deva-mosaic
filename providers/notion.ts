import { joinURL, withQuery, parseURL } from 'ufo'
import type { ProviderGetImage } from '@nuxt/image'

export const getImage: ProviderGetImage = (src, { modifiers, baseURL } = {}) => {
  const base = baseURL || 'https://www.notion.so'
  
  // Nếu src đã là URL đầy đủ thì trả về như vậy
  if (src.startsWith('http')) {
    return { url: src }
  }
  
  // Decode URL nếu bị encode
  let decodedSrc = decodeURIComponent(src)
  
  // Parse URL để lấy path và query params hiện tại
  const parsed = parseURL(decodedSrc)
  let imagePath = parsed.pathname
  
  // Đảm bảo path bắt đầu với /image/
  if (!imagePath.startsWith('/image/')) {
    imagePath = `/image/${imagePath.replace(/^\//, '')}`
  }
  
  // Merge query params hiện tại với modifiers
  const queryParams = { ...parsed.search }
  
  if (modifiers?.width) {
    queryParams.width = String(modifiers.width)
  }
  
  if (modifiers?.height) {
    queryParams.height = String(modifiers.height)
  }
  
  if (modifiers?.format) {
    queryParams.format = modifiers.format
  }
  
  if (modifiers?.quality) {
    queryParams.quality = String(modifiers.quality)
  }
  
  // Tạo URL cuối cùng
  const finalUrl = withQuery(joinURL(base, imagePath), queryParams)
  
  return { url: finalUrl }
}