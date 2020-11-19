import { NextApiRequest, NextApiResponse } from 'next'
import { constants } from 'http2'

const aws = require('aws-sdk')
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME

aws.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
})

function getSignedS3UrlForPut(file: { filename: string; contentType: string }): Promise<string> {
  const s3 = new aws.S3()
  const params = {
    Bucket: AWS_S3_BUCKET_NAME,
    Key: file.filename,
    Expires: 30, // sec
    ContentType: file.contentType,
  }

  console.log({
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_S3_BUCKET_NAME,
    file,
  })

  return new Promise((resolve, reject) => {
    s3.getSignedUrl('putObject', params, (err, url) => {
      if (err) {
        reject(err)
      }
      resolve(url)
    })
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return
  // const params = JSON.parse(req.body) as {filename?: string, contentType?: string}
  const params = req.body as { filename?: string; contentType?: string }
  res.setHeader('Content-Type', 'application/json')

  if (!params.filename || !params.contentType) {
    res.statusCode = 400
    res.end()
    return
  }

  try {
    const url = await getSignedS3UrlForPut({
      filename: params.filename,
      contentType: params.contentType,
    })
    res.statusCode = 200
    res.end(
      JSON.stringify({
        url,
        method: 'PUT',
      }),
    )
  } catch (e) {
    res.statusCode = 500
    res.end(JSON.stringify({ error: e }))
  }
}
