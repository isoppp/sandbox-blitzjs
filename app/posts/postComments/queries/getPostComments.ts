import { Ctx } from 'blitz'
import db, { FindManyPostCommentArgs } from 'db'
import { PromiseReturnType } from '@blitzjs/core'

type GetPostCommentsInput = Pick<FindManyPostCommentArgs, 'where' | 'orderBy' | 'skip' | 'take'>

export type PostCommentsReturnValues = PromiseReturnType<typeof getPostComments>['postComments']

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
          name: true,
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
