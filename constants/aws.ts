import aws, { S3 } from 'aws-sdk'
import { AWSError } from 'aws-sdk/lib/error'
import cuid from 'cuid'
import { assert } from 'utils/assert'

assert(process.env.AWS_ACCESS_KEY_ID, 'You must provide the AWS_ACCESS_KEY_ID env variable')
assert(process.env.AWS_SECRET_ACCESS_KEY, 'You must provide the AWS_SECRET_ACCESS_KEY env variable')
assert(process.env.AWS_S3_BUCKET_NAME, 'You must provide the AWS_S3_BUCKET_NAME env variable')

export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
export const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME

aws.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
})

export const s3 = new aws.S3()

export const copyS3Object = (
  params: S3.Types.CopyObjectRequest,
): Promise<{ err: AWSError; data: S3.Types.CopyObjectOutput }> => {
  return new Promise((resolve, reject) => {
    s3.copyObject(params, (err, data) => {
      if (err) {
        reject({ err, data })
      } else {
        resolve({ err, data })
      }
    })
  })
}

export const deleteS3Object = (
  params: S3.Types.DeleteObjectRequest,
): Promise<{ err: AWSError; data: S3.Types.DeleteObjectOutput }> => {
  return new Promise((resolve, reject) => {
    s3.deleteObject(params, (err, data) => {
      if (err) {
        reject({ err, data })
      } else {
        resolve({ err, data })
      }
    })
  })
}

export const S3KeyGen = (config: { model: string; userId: string; sourceFileName }) => {
  const separatedName = config.sourceFileName.split('.')
  const ext = separatedName[separatedName.length - 1]
  return `${config.model}/${config.userId}/${cuid()}.${ext}`
}
