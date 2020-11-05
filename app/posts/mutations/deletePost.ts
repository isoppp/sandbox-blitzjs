import { Ctx } from 'blitz'
import db, { PostDeleteArgs } from 'db'

type DeletePostInput = Pick<PostDeleteArgs, 'where'>

export default async function deletePost({ where }: DeletePostInput, ctx: Ctx) {
  ctx.session.authorize()

  const post = await db.post.delete({ where })

  return post
}
