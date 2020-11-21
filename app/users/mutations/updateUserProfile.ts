import { Ctx } from 'blitz'
import db, { UserUpdateInput, UserUpdateArgs } from 'db'

type UpdateAccountInput = Pick<UserUpdateArgs, 'where'> & {
  data: Pick<UserUpdateInput, 'displayId' | 'email' | 'name'>
}

export default async function updateUserProfile({ where, data }: UpdateAccountInput, ctx: Ctx) {
  ctx.session.authorize()

  // TODO confirmation email
  const user = await db.user.update({
    where,
    data,
    select: {
      displayId: true,
      email: true,
      name: true,
      imageUrl: true,
    },
  })

  return user
}
