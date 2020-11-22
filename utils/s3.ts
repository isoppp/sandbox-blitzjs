import { PUBLIC_IMAGE_URL } from 'constants/aws-public'

export const getImageUrl = (url): string => {
  if (!url) return '/images/icon-empty-profile.svg'
  const isFullPath = url.startsWith('http')
  return isFullPath ? url : `${PUBLIC_IMAGE_URL}/${url}`
}
