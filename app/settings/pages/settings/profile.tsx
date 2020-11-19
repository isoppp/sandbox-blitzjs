import React, { useCallback, useMemo } from 'react'
import SettingsLayout from 'app/layouts/SettingsLayout'
import { BlitzPage, invokeWithMiddleware, PromiseReturnType, useMutation, useRouter } from 'blitz'
import superjson from 'superjson'
import { getSessionContext } from '@blitzjs/server'
import { validateAuthorizationConditions } from 'utils/authorization'
import getUser from 'app/users/queries/getUser'
import logout from 'app/auth/mutations/logout'
import ProfileForm, { ProfileFormValues } from 'app/settings/components/ProfileForm'
import updateProfile from 'app/profiles/mutations/updateProfile'

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

const SettingsProfilePage: BlitzPage<{ user: string }> = (props) => {
  const router = useRouter()
  const user = useMemo(() => superjson.parse(props.user), [props.user]) as PromiseReturnType<typeof getUser>
  const [updateUserMutation] = useMutation(updateProfile)
  const [logoutMutation] = useMutation(logout)
  const onSubmit = useCallback(
    async (data: ProfileFormValues) => {
      try {
        const updated = await updateUserMutation({
          where: {
            id: user.id,
          },
          data,
        })
        alert('Success!' + JSON.stringify(updated))
        router.push(`/settings/profile`)
      } catch (e) {
        console.log(e)
      }
    },
    [router, updateUserMutation, user.id],
  )

  return (
    <div>
      <div className="my-8 first:mt-0">
        <ProfileForm onSubmit={onSubmit} initialValues={user} />
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

SettingsProfilePage.getLayout = (page) => <SettingsLayout title={'Edit Post'}>{page}</SettingsLayout>

export default SettingsProfilePage
