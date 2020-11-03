import { ReactNode } from 'react'
import { Head } from 'blitz'
import AppHeader from '../components/AppHeader'

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || 'sandbox-blitzjs'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <AppHeader />
      </header>
      <main>{children}</main>
    </>
  )
}

export default Layout
