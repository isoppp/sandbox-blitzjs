import { Link, BlitzPage, useMutation } from 'blitz'
import Layout from 'app/layouts/Layout'
import logout from 'app/auth/mutations/logout'
import { useCurrentUser } from 'app/hooks/useCurrentUser'
import { Suspense } from 'react'
import { Button } from 'antd'
/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>

        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User name: <code>{currentUser.name}</code>
          <br />
          User email: <code>{currentUser.email}</code>
          <br />
          User role: <code>{currentUser.roles.map((r) => r.name).join(', ')}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href="/signup">
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href="/login">
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <div className="container">
      <main>
        <Button type="primary">Primary Button</Button>
        <div className="bg-red-500">hoge</div>
        <div className="logo">
          <img src="/logo.png" alt="blitz.js" />
        </div>
        <div className="buttons" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <Suspense fallback="Loading...">
            <UserInfo />
          </Suspense>
        </div>
      </main>
    </div>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
