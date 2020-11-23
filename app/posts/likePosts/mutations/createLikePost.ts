import { Ctx } from 'blitz'
import db, { LikePostCreateArgs } from 'db'
import { RemoveUser } from '../../../../types/utils'

type CreateLikePostInput = RemoveUser<LikePostCreateArgs>
export default async function createLikePost({ data }: CreateLikePostInput, ctx: Ctx) {
  ctx.session.authorize()

  const likePost = await db.likePost.create({
    data: {
      ...data,
      user: {
        connect: {
          id: ctx.session.userId,
        },
      },
    },
  })

  return likePost
}
