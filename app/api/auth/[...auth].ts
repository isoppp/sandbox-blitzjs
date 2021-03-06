import { passportAuth } from 'blitz'
import db from 'db'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import { assert } from 'utils/assert'

assert(process.env.GOOGLE_CLIENT, 'You must provide the GOOGLE_CLIENT env variable')
assert(process.env.GOOGLE_SECRET, 'You must provide the GOOGLE_SECRET env variable')
assert(process.env.GOOGLE_CALLBACK_URL, 'You must provide the GOOGLE_CALLBACK_URL env variable')

export default passportAuth({
  successRedirectUrl: '/',
  errorRedirectUrl: '/',
  authenticateOptions: { scope: 'openid email profile' },
  strategies: [
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT ?? '',
        clientSecret: process.env.GOOGLE_SECRET ?? '',
        callbackURL: process.env.GOOGLE_CALLBACK_URL ?? '',
      },
      async function (_accessToken, _refreshToken, profile, cb) {
        const email = profile?.emails && profile?.emails[0]?.value

        if (!email) {
          // This can happen if you haven't enabled email access in your twitter app permissions
          return cb(new Error("Google OAuth response doesn't have email."))
        }

        const user = await db.user.upsert({
          where: { email },
          create: {
            email,
            name: profile?.displayName,
          },
          update: { email },
          include: {
            roles: true,
          },
        })

        const publicData = { userId: user.id, roles: user.roles.map((r) => r.name), source: 'twitter' }
        cb(null, { publicData })
      },
    ),
  ],
})
