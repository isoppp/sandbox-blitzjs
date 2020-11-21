import { Ctx } from 'blitz'
import db from 'db'

export default async function deleteUserImage(_, ctx: Ctx) {
  ctx.session.authorize()

  const user = await db.user.update({
    where: { id: ctx.session.userId },
    data: {
      imageUrl: null,
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
