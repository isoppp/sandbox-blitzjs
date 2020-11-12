import { Ctx } from 'blitz'
import db, { LikePostDeleteArgs } from 'db'
import { shouldBeSame, shouldHaveRole, validateAuthorizationConditions } from '../../../utils/authorization'
import { USER_ROLE } from '../../../utils/userRole'

type DeleteLikePostInput = Pick<LikePostDeleteArgs, 'where'>

export default async function deleteLikePost({ where }: DeleteLikePostInput, ctx: Ctx) {
  const resource = await db.likePost.findOne({ where, select: { userId: true } })
  validateAuthorizationConditions([
    shouldBeSame(resource?.userId, ctx?.session?.userId),
    shouldHaveRole(ctx?.session?.publicData?.roles, USER_ROLE.Admin),
  ])
  const likePost = await db.likePost.delete({ where })

  return likePost
}
