import React from 'react'
import { BlitzPage, useRouter } from 'blitz'
import Layout from 'app/layouts/Layout'
import { SignupForm } from 'app/auth/components/SignupForm'

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <SignupForm onSuccess={() => router.push('/')} />

      <div>or</div>

      <div>
        <a href="/api/auth/google" style={{ display: 'block' }}>
          Login with Google
        </a>
      </div>
    </div>
  )
}

SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
