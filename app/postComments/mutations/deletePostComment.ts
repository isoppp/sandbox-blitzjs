import { Ctx } from 'blitz'
import db, { PostCommentDeleteArgs } from 'db'
import { shouldBeSame, shouldHaveRole, validateAuthorizationConditions } from '../../../utils/authorization'
import { USER_ROLE } from '../../../utils/userRole'

type DeletePostCommentInput = Pick<PostCommentDeleteArgs, 'where'>

export default async function deletePostComment({ where }: DeletePostCommentInput, ctx: Ctx) {
  const resource = await db.postComment.findOne({ where, select: { userId: true } })
  validateAuthorizationConditions([
    shouldBeSame(resource?.userId, ctx?.session?.userId),
    shouldHaveRole(ctx?.session?.publicData?.roles, USER_ROLE.Admin),
  ])
  const postComment = await db.postComment.delete({ where })

  return postComment
}
