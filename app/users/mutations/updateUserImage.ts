import { Ctx } from 'blitz'
import db, { UserUpdateInput, UserUpdateArgs } from 'db'

type UpdateImageInput = Pick<UserUpdateArgs, 'where'> & { data: Pick<UserUpdateInput, 'imageUrl'> }

export default async function updateUserImage({ where, data }: UpdateImageInput, ctx: Ctx) {
  ctx.session.authorize()

  // TODO move temp image file to real path

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
