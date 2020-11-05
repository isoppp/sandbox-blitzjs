import { ReactNode } from 'react'
import { Head } from 'blitz'
import AppHeader from '../components/AppHeader'

type LayoutProps = {
  title?: string
  children: ReactNode
  containerClassName?: string
}

const Layout = ({ title, children, containerClassName = 'container mx-auto py-10' }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || 'sandbox-blitzjs'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <AppHeader />
      </header>
      <main className={containerClassName}>{children}</main>
    </>
  )
}

export default Layout
