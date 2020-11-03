const { sessionMiddleware, unstable_simpleRolesIsAuthorized } = require('@blitzjs/server')
const withLess = require('@zeit/next-less')
const withCss = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')

module.exports = withLess(
  withSass(
    withCss({
      middleware: [
        sessionMiddleware({
          unstable_isAuthorized: unstable_simpleRolesIsAuthorized,
        }),
      ],
      lessLoaderOptions: {
        javascriptEnabled: true,
      },
      webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        return config
      },
    }),
  ),
)
