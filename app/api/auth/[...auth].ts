import { passportAuth } from 'blitz'
import db from 'db'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'

function assert(condition: any, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

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
          return cb(new Error("Twitter OAuth response doesn't have email."))
        }

        const user = await db.user.upsert({
          where: { email },
          create: {
            email,
            name: profile?.displayName,
          },
          update: { email },
        })

        const publicData = { userId: user.id, roles: [user.role], source: 'twitter' }
        cb(null, { publicData })
      },
    ),
  ],
})
