import { Suspense } from 'react'
import { useCurrentUser } from 'app/hooks/useCurrentUser'
import { Link, PromiseReturnType } from 'blitz'
import getCurrentUser from '../users/queries/getCurrentUser'
import { getImageUrl } from 'utils/s3'

export const getServerSideProps = async ({ req, res }) => {
  // const session = await getSessionContext(req, res)
  return { props: {} }
}

type User = PromiseReturnType<typeof getCurrentUser>

const UserProfile = ({ user }: { user: User }) => {
  return (
    <Link href={`/settings/account`}>
      <a className="block transition duration-150 hover:bg-gray-200 py-2 px-3">
        <div className="flex items-center gap-2">
          <div>Hi {user?.name}!</div>
          <div>
            <img src={getImageUrl(user?.imageUrl)} className="w-10 h-10 object-cover rounded-full shadow-sm" alt="" />
          </div>
        </div>
      </a>
    </Link>
  )
}

const HeaderAuthNav = () => {
  const user = useCurrentUser()

  if (user?.id) {
    return (
      <div className="flex items-center gap-4">
        <div>
          <Suspense fallback={''}>
            <UserProfile user={user} />
          </Suspense>
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
}

const HeaderNav = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-24">
        <Link href={'/'}>
          <a>
            <img src="/logo.png" alt="blitz.js" />
          </a>
        </Link>
      </div>
      <div className="px-10">
        <div className="flex items-center divide-x font-bold">
          <Link href={'/posts'}>
            <a className="px-4 transition duration-150 hover:opacity-75">Posts</a>
          </Link>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-4 min-h-14">
        {' '}
        <Suspense fallback={''}>{<HeaderAuthNav />}</Suspense>
      </div>
    </div>
  )
}

export default function AppHeader() {
  return (
    <div className="shadow-md">
      <div className="container mx-auto py-4">
        <HeaderNav />
      </div>
    </div>
  )
}
