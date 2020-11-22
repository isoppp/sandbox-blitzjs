import { NextApiRequest, NextApiResponse } from 'next'
import { s3 } from 'constants/aws'
import { AWS_S3_BUCKET_NAME } from 'constants/aws-public'

function getSignedS3UrlForPut(file: { filename: string; contentType: string }): Promise<string> {
  const params = {
    Bucket: AWS_S3_BUCKET_NAME,
    Key: file.filename,
    Expires: 30, // sec
    ContentType: file.contentType,
  }

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
