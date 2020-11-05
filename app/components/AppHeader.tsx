import { useCurrentUser, useCurrentUserFromSession } from '../hooks/useCurrentUser'
import { Link, useMutation } from 'blitz'
import logout from '../auth/mutations/logout'
import { memo, Suspense } from 'react'
import { getSessionContext } from '@blitzjs/server'

export const getServerSideProps = async ({ req, res }) => {
  // const session = await getSessionContext(req, res)
  return { props: {} }
}

const HeaderNav = memo(() => {
  return (
    <div className="font-bold">
      <Link href={'/posts'}>
        <a className="transition duration-150 hover:opacity-75">Posts</a>
      </Link>
    </div>
  )
})

const HeaderAuthNav = memo(() => {
  const simpleUser = useCurrentUserFromSession()
  const [logoutMutation] = useMutation(logout)

  if (simpleUser.isLoading) return <></>

  if (!!simpleUser?.id) {
    return (
      <div className="flex items-center gap-4">
        <div>{[simpleUser?.id, simpleUser?.roles.join(', ')].join(' / ')}</div>
        <div>
          <button onClick={async () => await logoutMutation()}>Logout</button>
        </div>
      </div>
    )
  } else {
    return (
      <div className="flex items-center gap-4">
        <div>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </div>
        <div>
          <Link href="/signup">
            <a>Signup</a>
          </Link>
        </div>
      </div>
    )
  }
})

const AppHeader = () => {
  return (
    <div className="shadow-md">
      <div className="container mx-auto flex items-center gap-4 py-4">
        <div className="w-24">
          <Link href={'/'}>
            <a>
              <img src="/logo.png" alt="blitz.js" />
            </a>
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="border-r border-gray-700 pr-4">
            <HeaderNav />
          </div>
          <HeaderAuthNav />
        </div>
      </div>
    </div>
  )
}

export default memo(AppHeader)
