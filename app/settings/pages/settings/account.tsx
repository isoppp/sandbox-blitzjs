import React, { useMemo } from 'react'
import SettingsLayout from 'app/layouts/SettingsLayout'
import { BlitzPage, GetServerSideProps, invokeWithMiddleware, PromiseReturnType } from 'blitz'
import superjson from 'superjson'
import { getSessionContext } from '@blitzjs/server'
import { validateAuthorizationConditions } from 'utils/authorization'
import getUser from 'app/users/queries/getUser'
import { useAccount } from 'app/settings/hooks/useAccount'
import UserImageForm from 'app/settings/components/UserImageForm'
import UserPasswordForm from 'app/settings/components/UserPasswordForm'
import UserProfileForm from 'app/settings/components/UserProfileForm'
import { UploadedImagePreview } from 'app/components/forms/UploadedImagePreview'

export const getServerSideProps: GetServerSideProps = async (context) => {
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
  const user = useMemo(() => superjson.parse(props.user), [props.user]) as PromiseReturnType<typeof getUser>
  const {
    logoutMutation,
    onSubmitUserPassword,
    onSubmitUserProfile,
    onSubmitUserImage,
    onDeleteUserImage,
  } = useAccount(user)

  return (
    <div>
      <section className="mt-10 first:mt-0 pt-10 first:pt-0">
        <h2 className="mb-8 font-bold text-2xl border-b-4">Avatar</h2>
        <div className="first:mt-0">
          {user.imageUrl ? (
            <UploadedImagePreview url={user.imageUrl} onDeleteFile={onDeleteUserImage} />
          ) : (
            <UserImageForm onSubmit={onSubmitUserImage} initialValues={user} />
          )}
        </div>
      </section>

      <section className="mt-10 first:mt-0 pt-10 first:pt-0">
        <h2 className="mb-8 font-bold text-2xl border-b-4">Profile</h2>
        <div className="first:mt-0">
          <UserProfileForm onSubmit={onSubmitUserProfile} initialValues={user} />
        </div>
      </section>

      <section className="mt-10 first:mt-0 pt-10 first:pt-0">
        <h2 className="mb-8 font-bold text-2xl border-b-4">Password</h2>
        <div className="first:mt-0">
          <UserPasswordForm onSubmit={onSubmitUserPassword} initialValues={user} />
        </div>
      </section>

      <section className="mt-10 first:mt-0 pt-10 first:pt-0">
        <h2 className="mb-8 font-bold text-2xl border-b-4">Logout</h2>
        <div className="flex justify-center">
          <button
            className="border rounded-md py-2 px-4 text-sm focus:outline-none font-bold text-gray-600"
            onClick={logoutMutation}
          >
            Logout
          </button>
        </div>
      </section>
    </div>
  )
}

SettingsAccountPage.getLayout = (page) => <SettingsLayout title={'Edit Post'}>{page}</SettingsLayout>

export default SettingsAccountPage
