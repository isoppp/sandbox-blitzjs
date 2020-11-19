import { Ctx } from 'blitz'
import db, { ProfileUpdateArgs } from 'db'

type UpdateProfileInput = Pick<ProfileUpdateArgs, 'where' | 'data'>

export default async function updateProfile({ where, data }: UpdateProfileInput, ctx: Ctx) {
  ctx.session.authorize()

  const profile = await db.profile.update({ where, data })

  return profile
}
