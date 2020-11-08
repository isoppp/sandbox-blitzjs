import { Ctx } from 'blitz'
import db, { LikePostCreateArgs } from 'db'

type CreateLikePostInput = Pick<LikePostCreateArgs, 'data'>
export default async function createLikePost({ data }: CreateLikePostInput, ctx: Ctx) {
  ctx.session.authorize()

  const likePost = await db.likePost.create({ data })

  return likePost
}
