import { Ctx, NotFoundError } from 'blitz'
import db from 'db'
import { AWS_S3_BUCKET_NAME, deleteS3Object } from 'constants/aws'

export default async function deleteUserImage(_, ctx: Ctx) {
  ctx.session.authorize()

  const currentUser = await await db.user.findOne({ where: { id: ctx.session.userId }, select: { imageUrl: true } })
  if (!currentUser || !currentUser.imageUrl) throw new NotFoundError()

  const params = { Bucket: AWS_S3_BUCKET_NAME ?? '', Key: currentUser.imageUrl } // validation
  const res = await deleteS3Object(params)

  if (res?.err) {
    throw new Error()
  }

  const user = await db.user.update({
    where: { id: ctx.session.userId },
    data: {
      imageUrl: null,
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
