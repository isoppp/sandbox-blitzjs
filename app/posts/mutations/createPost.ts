import { Ctx } from 'blitz'
import db from 'db'
import { PostCreateData, PostCreateDataType } from 'app/posts/validations'

export default async function createPost({ data }: { data: PostCreateDataType }, ctx: Ctx) {
  ctx.session.authorize()
  const parsed = PostCreateData.parse(data)
  const post = await db.post.create({
    data: {
      ...parsed,
      author: {
        connect: {
          id: ctx.session.userId,
        },
      },
    },
  })

  return post
}
