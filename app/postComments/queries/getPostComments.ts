import { Ctx } from 'blitz'
import db, { FindManyPostCommentArgs } from 'db'

type GetPostCommentsInput = Pick<FindManyPostCommentArgs, 'where' | 'orderBy' | 'skip' | 'take'>

export default async function getPostComments({ where, orderBy, skip = 0, take }: GetPostCommentsInput, ctx: Ctx) {
  // ctx.session.authorize()

  const postComments = await db.postComment.findMany({
    where,
    orderBy,
    take,
    skip,
    include: {
      user: {
        select: {
          id: true,
          profile: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })

  const count = await db.postComment.count()
  const hasMore = typeof take === 'number' ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    postComments,
    nextPage,
    hasMore,
    count,
  }
}
