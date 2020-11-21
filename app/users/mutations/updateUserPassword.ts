import { AuthenticationError, Ctx } from 'blitz'
import db, { UserUpdateInput, UserUpdateArgs } from 'db'
import { hashPassword } from '../../auth/auth-utils'

type updateUserPasswordInput = Pick<UserUpdateArgs, 'where'> & {
  data: { password: string; password_confirmation: string }
}

export default async function updateUserPassword({ where, data }: updateUserPasswordInput, ctx: Ctx) {
  ctx.session.authorize()

  if (data.password !== data.password_confirmation) {
    // TODO create error class
    throw Error(JSON.stringify({ status: 400, error: 'password and password_confirmation is not the same' }))
  }

  const hashedPassword = await hashPassword(data.password)

  const user = await db.user.update({
    where,
    data: {
      hashedPassword,
    },
    select: {
      displayId: true,
      email: true,
      name: true,
      imageUrl: true,
    },
  })

  return user
}
