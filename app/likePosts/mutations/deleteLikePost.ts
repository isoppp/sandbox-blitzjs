import { Ctx } from 'blitz'
import db, { LikePostDeleteArgs } from 'db'

type DeleteLikePostInput = Pick<LikePostDeleteArgs, 'where'>

export default async function deleteLikePost({ where }: DeleteLikePostInput, ctx: Ctx) {
  ctx.session.authorize()

  const likePost = await db.likePost.delete({ where })

  return likePost
}
