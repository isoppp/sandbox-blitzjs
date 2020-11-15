import React, { useCallback, useMemo } from 'react'
import SettingsLayout from 'app/layouts/SettingsLayout'
import { BlitzPage, invokeWithMiddleware, PromiseReturnType, useMutation, useRouter } from 'blitz'
import updatePost from 'app/posts/mutations/updatePost'
import PostForm, { PostFormValues } from 'app/posts/components/PostForm'
import superjson from 'superjson'
import { Post } from 'db'
import { getSessionContext } from '@blitzjs/server'
import { validateAuthorizationConditions } from 'utils/authorization'
import getUser from 'app/users/queries/getUser'
import AccountForm, { AccountFormValues } from 'app/users/components/AccountForm'
import updateUser from 'app/users/mutations/updateUser'
import logout from 'app/auth/mutations/logout'

export async function getServerSideProps(context) {
  const session = await getSessionContext(context.req, context.res)
  validateAuthorizationConditions([!!session.userId])
  const user = await invokeWithMiddleware(getUser, { where: { id: Number(session.userId) } }, context)
  const dataString = superjson.stringify(user)

  return {
    props: {
      user: dataString,
    }, // will be passed to the page component as props
  }
}

export const EditPost = ({ post }: { post: Post }) => {
  const router = useRouter()
  const [updatePostMutation] = useMutation(updatePost)
  const onSubmit = useCallback(
    async (data: PostFormValues) => {
      try {
        const updated = await updatePostMutation({
          where: { id: post.id },
          data,
        })
        alert('Success!' + JSON.stringify(updated))
        router.push(`/posts/${updated.slug}`)
      } catch (error) {
        alert('Error creating post ' + JSON.stringify(error, null, 2))
      }
    },
    [post.id, router, updatePostMutation],
  )

  return (
    <div>
      <h1>Edit Post {post.id}</h1>
      <pre>{JSON.stringify(post)}</pre>

      <PostForm initialValues={post} onSubmit={onSubmit} />
    </div>
  )
}

const SettingsAccountPage: BlitzPage<{ user: string }> = (props) => {
  const router = useRouter()
  const user = useMemo(() => superjson.parse(props.user), [props.user]) as PromiseReturnType<typeof getUser>
  const [updateUserMutation] = useMutation(updateUser)
  const [logoutMutation] = useMutation(logout)
  const onSubmit = useCallback(
    async (data: AccountFormValues) => {
      const { password_confirmation, ...submitData } = data
      try {
        const updated = await updateUserMutation({
          where: {
            id: user.id,
          },
          data: {
            ...submitData,
          },
        })
        alert('Success!' + JSON.stringify(updated))
        router.push(`/settings/account`)
      } catch (e) {
        console.log(e)
      }
    },
    [updateUserMutation, user.id],
  )

  return (
    <div>
      <div className="my-8 first:mt-0">
        <AccountForm onSubmit={onSubmit} initialValues={user} />
      </div>

      <div className="mt-6 flex justify-center">
        <button
          className="border rounded-md py-2 px-4 focus:outline-none font-bold text-gray-600"
          onClick={logoutMutation}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

SettingsAccountPage.getLayout = (page) => <SettingsLayout title={'Edit Post'}>{page}</SettingsLayout>

export default SettingsAccountPage
