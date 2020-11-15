import { Ctx } from 'blitz'
import db, { UserUpdateArgs } from 'db'
import { hashPassword } from '../../auth/auth-utils'

type UpdateUserInput = Pick<UserUpdateArgs, 'where' | 'data'>

export default async function updateUser({ where, data }: UpdateUserInput & { data: { password?: string } }, ctx: Ctx) {
  ctx.session.authorize()
  const { displayId, email, password } = data
  const submitData: Pick<UserUpdateArgs, 'data'>['data'] = {
    displayId,
    email,
  }
  if (password) {
    submitData.hashedPassword = await hashPassword(password)
  }

  const user = await db.user.update({
    where,
    data: submitData,
    select: {
      displayId: true,
      email: true,
      profile: {
        select: {
          name: true,
          imageUrl: true,
        },
      },
    },
  })

  return user
}
