import { PromiseReturnType, useMutation, useRouter } from 'blitz'
import logout from 'app/auth/mutations/logout'
import { useCallback } from 'react'
import deleteUserImage from 'app/users/mutations/deleteUserImage'
import updateUserImage from 'app/users/mutations/updateUserImage'
import updateUserPassword from 'app/users/mutations/updateUserPassword'
import updateUserProfile from 'app/users/mutations/updateUserProfile'
import { UserImageFormValues } from 'app/settings/components/UserImageForm'
import { UserProfileFormValues } from 'app/settings/components/UserProfileForm'
import { UserPasswordFormValues } from 'app/settings/components/UserPasswordForm'
import getUser from 'app/users/queries/getUser'

export const useAccount = (user: PromiseReturnType<typeof getUser>) => {
  const router = useRouter()
  const [updateUserImageMutation] = useMutation(updateUserImage)
  const [deleteUserImageMutation] = useMutation(deleteUserImage)
  const [updateUserProfileMutation] = useMutation(updateUserProfile)
  const [updateUserPasswordMutation] = useMutation(updateUserPassword)
  const [logoutMutation] = useMutation(logout)

  const onSubmitUserImage = useCallback(
    async (data: UserImageFormValues) => {
      try {
        const updated = await updateUserImageMutation({
          where: {
            id: user.id,
          },
          data,
        })
        alert('Success!' + JSON.stringify(updated))
        router.push(router.pathname)
      } catch (e) {
        console.log(e)
      }
    },
    [router, updateUserImageMutation, user.id],
  )

  const onDeleteUserImage = useCallback(async () => {
    try {
      const deleted = await deleteUserImageMutation()
      alert('Success!' + JSON.stringify(deleted))
      router.push(router.pathname)
    } catch (e) {
      console.log(e)
    }
  }, [deleteUserImageMutation, router])

  const onSubmitUserProfile = useCallback(
    async (data: UserProfileFormValues) => {
      console.log(data)
      try {
        const updated = await updateUserProfileMutation({
          where: {
            id: user.id,
          },
          data,
        })
        alert('Success!' + JSON.stringify(updated))
        router.push(router.pathname)
      } catch (e) {
        console.log(e)
      }
    },
    [router, updateUserProfileMutation, user.id],
  )

  const onSubmitUserPassword = useCallback(
    async (data: UserPasswordFormValues) => {
      try {
        const updated = await updateUserPasswordMutation({
          where: {
            id: user.id,
          },
          data,
        })
        alert('Success!' + JSON.stringify(updated))
        router.push(router.pathname)
      } catch (e) {
        console.log(e)
      }
    },
    [router, updateUserPasswordMutation, user.id],
  )

  return {
    logoutMutation,
    onDeleteUserImage,
    onSubmitUserImage,
    onSubmitUserProfile,
    onSubmitUserPassword,
  }
}
