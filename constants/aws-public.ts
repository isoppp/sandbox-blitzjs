import { assert } from 'utils/assert'

assert(process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME, 'You must provide the NEXT_PUBLIC_AWS_S3_BUCKET_NAME env variable')
assert(
  process.env.NEXT_PUBLIC_AWS_S3_TEMP_DIR_NAME,
  'You must provide the NEXT_PUBLIC_AWS_S3_TEMP_DIR_NAME env variable',
)
assert(process.env.NEXT_PUBLIC_AWS_S3_REGION, 'You must provide the NEXT_PUBLIC_AWS_S3_REGION env variable')
assert(process.env.NEXT_PUBLIC_PUBLIC_IMAGE_URL, 'You must provide the NEXT_PUBLIC_PUBLIC_IMAGE_URL env variable')

export const AWS_S3_TEMP_DIR_NAME = process.env.NEXT_PUBLIC_AWS_S3_TEMP_DIR_NAME
export const AWS_S3_BUCKET_NAME = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME
export const AWS_S3_REGION = process.env.NEXT_PUBLIC_AWS_S3_REGION
export const AWS_S3_PATH = `https://${AWS_S3_BUCKET_NAME}.s3.${AWS_S3_REGION}.amazonaws.com`
// export const AWS_S3_PATH = `https://${AWS_S3_BUCKET_NAME}.s3.amazonaws.com`
export const PUBLIC_IMAGE_URL = process.env.NEXT_PUBLIC_PUBLIC_IMAGE_URL
