import { Ctx, NotFoundError } from 'blitz'
import db, { FindFirstLikePostArgs } from 'db'

type GetLikePostInput = Pick<FindFirstLikePostArgs, 'where'>

export default async function getLikePost({ where }: GetLikePostInput, ctx: Ctx) {
  // ctx.session.authorize()

  const likePost = await db.likePost.findFirst({ where })

  if (!likePost) throw new NotFoundError()

  return likePost
}
