import { Ctx } from 'blitz'
import db, { PostCreateArgs } from 'db'

type CreatePostInput = Pick<PostCreateArgs, 'data'>
export default async function createPost({ data }: CreatePostInput, ctx: Ctx) {
  ctx.session.authorize()

  const post = await db.post.create({ data })

  return post
}
