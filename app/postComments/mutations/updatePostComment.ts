import { Ctx } from 'blitz'
import db, { PostCommentUpdateArgs } from 'db'
import { shouldBeSame, shouldHaveRole, validateAuthorizationConditions } from '../../../utils/authorization'
import { USER_ROLE } from '../../../utils/userRole'

type UpdatePostCommentInput = Pick<PostCommentUpdateArgs, 'where' | 'data'>

export default async function updatePostComment({ where, data }: UpdatePostCommentInput, ctx: Ctx) {
  const resource = await db.postComment.findOne({ where, select: { userId: true } })
  validateAuthorizationConditions([
    shouldBeSame(resource?.userId, ctx?.session?.userId),
    shouldHaveRole(ctx?.session?.publicData?.roles, USER_ROLE.Admin),
  ])

  const postComment = await db.postComment.update({
    where,
    data,
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })

  return postComment
}
