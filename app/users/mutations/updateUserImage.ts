import { Ctx } from 'blitz'
import db, { UserUpdateInput, UserUpdateArgs } from 'db'
import { AWS_S3_BUCKET_NAME, copyS3Object, S3KeyGen } from 'constants/aws'
import cuid from 'cuid'
import path from 'path'

type UpdateImageInput = Pick<UserUpdateArgs, 'where'> & { data: { imageUrl: string } }

export default async function updateUserImage({ where, data }: UpdateImageInput, ctx: Ctx) {
  ctx.session.authorize()
  if (!data.imageUrl) {
    throw new Error()
  }

  const resourcePath = data.imageUrl.split('amazonaws.com')[1]
  const key = `user/${ctx.session.userId}/${cuid()}${path.extname(data.imageUrl)}`
  const params = {
    Bucket: AWS_S3_BUCKET_NAME,
    CopySource: `/${AWS_S3_BUCKET_NAME}${resourcePath}`,
    Key: key,
  }
  const res = await copyS3Object(params)

  if (res?.err) {
    throw res.err
  }

  const user = await db.user.update({
    where,
    data: {
      ...data,
      imageUrl: data.imageUrl.replace(resourcePath, `/${key}`),
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
