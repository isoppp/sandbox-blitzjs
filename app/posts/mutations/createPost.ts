import { Ctx } from 'blitz'
import db from 'db'
import { PostMutationInput, PostMutationInputType } from 'app/posts/validations'

export default async function createPost({ data }: { data: PostMutationInputType }, ctx: Ctx) {
  ctx.session.authorize()
  console.log({ data })

  const parsed = PostMutationInput.parse(data)
  console.log({ parsed })

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
