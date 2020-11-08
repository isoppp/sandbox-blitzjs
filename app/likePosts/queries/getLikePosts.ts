import { Ctx } from 'blitz'
import db, { FindManyLikePostArgs } from 'db'

type GetLikePostsInput = Pick<FindManyLikePostArgs, 'where' | 'orderBy' | 'skip' | 'take'>

export default async function getLikePosts({ where, orderBy, skip = 0, take }: GetLikePostsInput, ctx: Ctx) {
  ctx.session.authorize()

  const likePosts = await db.likePost.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.likePost.count()
  const hasMore = typeof take === 'number' ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    likePosts,
    nextPage,
    hasMore,
    count,
  }
}
