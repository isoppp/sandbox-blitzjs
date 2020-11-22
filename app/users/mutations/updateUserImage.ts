import { Ctx } from 'blitz'
import db, { UserUpdateArgs } from 'db'
import { copyS3Object } from 'constants/aws'
import { AWS_S3_BUCKET_NAME, AWS_S3_PATH } from 'constants/aws-public'
import cuid from 'cuid'
import path from 'path'

type UpdateImageInput = Pick<UserUpdateArgs, 'where'> & { data: { imageUrl: string } }

export default async function updateUserImage({ where, data }: UpdateImageInput, ctx: Ctx) {
  ctx.session.authorize()
  if (!data.imageUrl) {
    throw new Error()
  }

  const resourcePath = data.imageUrl.replace(AWS_S3_PATH, '')
  const key = `user/${ctx.session.userId}/${cuid()}${path.extname(data.imageUrl)}`
  const params = {
    CopySource: `/${AWS_S3_BUCKET_NAME}${resourcePath}`, // /BUCKET_NAME/PATH
    Bucket: AWS_S3_BUCKET_NAME,
    Key: key, // PATH
  }

  const res = await copyS3Object(params)

  if (res?.err) {
    throw res.err
  }

  const user = await db.user.update({
    where,
    data: {
      ...data,
      imageUrl: key,
    },
    select: {
      displayId: true,
      email: true,
      name: true,
      imageUrl: true,
    },
  })

  return user
}
