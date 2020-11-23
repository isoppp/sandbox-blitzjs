import { Ctx } from 'blitz'
import db, { PostUpdateArgs } from 'db'
import { shouldBeSame, shouldHaveRole, validateAuthorizationConditions } from '../../../utils/authorization'
import { USER_ROLE } from '../../../utils/userRole'
import { PostUpdateData, PostUpdateDataType } from 'app/posts/validations'

type UpdatePostInput = Pick<PostUpdateArgs, 'where'> & { data: PostUpdateDataType }

export default async function updatePost({ where, data }: UpdatePostInput, ctx: Ctx) {
  const resource = await db.post.findOne({ where, select: { authorId: true } })
  validateAuthorizationConditions([
    shouldBeSame(resource?.authorId, ctx?.session?.userId),
    shouldHaveRole(ctx?.session?.publicData?.roles, USER_ROLE.Admin),
  ])
  const parsed = PostUpdateData.parse(data)

  const post = await db.post.update({ where, data: parsed })
  return post
}
