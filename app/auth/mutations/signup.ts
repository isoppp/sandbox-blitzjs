import { Ctx } from 'blitz'
import db from 'db'
import { hashPassword } from 'app/auth/auth-utils'
import { SignupInput, SignupInputType } from 'app/auth/validations'
import { USER_ROLE } from '../../../utils/userRole'

export default async function signup(input: SignupInputType, { session }: Ctx) {
  // This throws an error if input is invalid
  const { email, password } = SignupInput.parse(input)

  const hashedPassword = await hashPassword(password)
  const user = await db.user.create({
    data: {
      email: email.toLowerCase(),
      hashedPassword,
      roles: {
        connect: [
          {
            name: USER_ROLE.User,
          },
        ],
      },
    },
    select: { id: true, name: true, email: true, roles: { select: { name: true } } },
  })

  await session.create({ userId: user.id, roles: user.roles.map((r) => r.name) })

  return user
}
