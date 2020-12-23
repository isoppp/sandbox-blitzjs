import { Ctx } from 'blitz'
import db, { PostDeleteArgs } from 'db'
import { shouldBeSame, shouldHaveRole, validateAuthorizationConditions } from '../../../utils/authorization'
import { USER_ROLE } from '../../../utils/userRole'

export default async function deletePost({ where }: Pick<PostDeleteArgs, 'where'>, ctx: Ctx) {
  ctx.session.authorize()
  const resource = await db.post.findOne({ where, select: { authorId: true } })
  validateAuthorizationConditions([
    shouldBeSame(resource?.authorId, ctx?.session?.userId),
    shouldHaveRole(ctx?.session?.publicData?.roles, USER_ROLE.Admin),
  ])

  const post = await db.post.delete({ where })

  return post
}
