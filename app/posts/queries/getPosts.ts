import { Ctx } from 'blitz'
import db, { FindManyPostArgs } from 'db'

type GetPostsInput = Pick<FindManyPostArgs, 'where' | 'orderBy' | 'skip' | 'take'>

export default async function getPosts({ where, orderBy, skip = 0, take }: GetPostsInput, ctx: Ctx) {
  ctx.session.authorize()

  const posts = await db.post.findMany({
    where,
    orderBy,
    take,
    skip,
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  })

  const count = await db.post.count()
  const hasMore = typeof take === 'number' ? skip + take < count : false

  return {
    posts,
    hasMore,
    count,
  }
}
