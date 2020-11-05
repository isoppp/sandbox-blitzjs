import { useCurrentUser, useCurrentUserFromSession } from '../hooks/useCurrentUser'
import { Link, useMutation } from 'blitz'
import logout from '../auth/mutations/logout'
import { Suspense } from 'react'
import { getSessionContext } from '@blitzjs/server'

export const getServerSideProps = async ({ req, res }) => {
  // const session = await getSessionContext(req, res)
  return { props: {} }
}

const HeaderNavs = () => {
  const simpleUser = useCurrentUserFromSession()
  const [logoutMutation] = useMutation(logout)

  if (simpleUser.isLoading) return <></>

  if (!!simpleUser?.id) {
    return (
      <>
        <div className="ml-auto">{[simpleUser?.id, simpleUser?.roles.join(', ')].join(' / ')}</div>
        <div>
          <button onClick={async () => await logoutMutation()}>Logout</button>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="ml-auto">
          <Link href="/login">
            <a>Login</a>
          </Link>
        </div>
        <div>
          <Link href="/signup">
            <a>Signup</a>
          </Link>
        </div>
      </>
    )
  }
}

export default function AppHeader() {
  return (
    <div className="shadow-md">
      <div className="container mx-auto flex items-center gap-4 py-4">
        <div className="w-24">
          <img src="/logo.png" alt="blitz.js" />
        </div>
        <HeaderNavs />
      </div>
    </div>
  )
}
