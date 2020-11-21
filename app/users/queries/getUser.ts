import { Ctx, NotFoundError } from 'blitz'
import db, { FindFirstUserArgs } from 'db'

type GetUserInput = Pick<FindFirstUserArgs, 'where'>

export default async function getUser({ where }: GetUserInput, ctx: Ctx) {
  ctx.session.authorize()

  const user = await db.user.findFirst({
    where,
    select: {
      id: true,
      displayId: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      name: true,
      imageUrl: true,
      roles: {
        select: {
          name: true,
        },
      },
    },
  })

  if (!user) throw new NotFoundError()

  return user
}
