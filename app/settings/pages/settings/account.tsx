import React, { useCallback, useMemo } from 'react'
import SettingsLayout from 'app/layouts/SettingsLayout'
import { BlitzPage, invokeWithMiddleware, PromiseReturnType, useMutation, useRouter } from 'blitz'
import superjson from 'superjson'
import { getSessionContext } from '@blitzjs/server'
import { validateAuthorizationConditions } from 'utils/authorization'
import getUser from 'app/users/queries/getUser'
import AccountForm, { AccountFormValues } from 'app/settings/components/AccountForm'
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
    [router, updateUserMutation, user.id],
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
