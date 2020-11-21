import { Ctx, NotFoundError } from 'blitz'
import db, { FindFirstPostArgs } from 'db'

type GetPostInput = Pick<FindFirstPostArgs, 'where'>

export default async function getPost({ where }: GetPostInput, ctx: Ctx) {
  // ctx.session.authorize()
  const post = await db.post.findFirst({
    where,
    include: {
      author: {
        select: {
          id: true,
          name: true,
        },
      },
      likes: {
        select: {
          id: true,
          userId: true,
        },
      },
    },
  })

  if (!post) throw new NotFoundError()

  return post
}
