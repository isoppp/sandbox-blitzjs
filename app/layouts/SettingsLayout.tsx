import { ReactNode } from 'react'
import { Head, Link, useMutation, useRouter } from 'blitz'
import AppHeader from '../components/AppHeader'
import classNames from 'classnames'
import logout from 'app/auth/mutations/logout'
type LayoutProps = {
  title?: string
  children: ReactNode
  containerClassName?: string
}

const Layout = ({ title, children, containerClassName = 'container mx-auto py-10' }: LayoutProps) => {
  const router = useRouter()
  const [logoutMutation] = useMutation(logout)

  console.log({ router })
  const settingNavs = [
    {
      label: 'Account',
      href: '/settings/account',
    },
  ]
  return (
    <>
      <Head>
        <title>{title || 'sandbox-blitzjs'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <AppHeader />
      </header>

      <main className={classNames(['flex', containerClassName])}>
        <aside className="w-56 py-4 mr-8 border-r border-gray-200">
          <ul>
            {settingNavs.map((nav) => (
              <li key={nav.href}>
                <Link href={nav.href}>
                  <a
                    className={classNames([
                      'block py-2 px-4',
                      'transition duration-100 hover:bg-gray-100',
                      router.pathname === nav.href && 'bg-gray-100 color-white font-bold',
                    ])}
                  >
                    {nav.label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <div className="flex-1">{children}</div>
      </main>
    </>
  )
}

export default Layout
