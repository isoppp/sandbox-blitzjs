import { Ctx } from 'blitz'
import db, { UserUpdateArgs } from 'db'
import { hashPassword } from '../../auth/auth-utils'

type updateUserPasswordInput = Pick<UserUpdateArgs, 'where'> & {
  data: { password: string; passwordConfirmation: string }
}

export default async function updateUserPassword({ where, data }: updateUserPasswordInput, ctx: Ctx) {
  ctx.session.authorize()

  if (data.password !== data.passwordConfirmation) {
    // TODO create error class
    throw Error(JSON.stringify({ status: 400, error: 'password and passwordConfirmation is not the same' }))
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
