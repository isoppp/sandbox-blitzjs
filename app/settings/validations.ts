import * as z from 'zod'
import { email, password, urlPath } from 'constants/zod'

// image
export const UserImageFormInput = z.object({
  imageUrl: z.string().nonempty(),
})

export type UserImageFormInputType = z.infer<typeof UserImageFormInput>

export const UserImageUpdateData = UserImageFormInput
export type UserImageUpdateDataType = UserImageFormInputType

// profile
export const UserProfileFormInput = z.object({
  displayId: urlPath.min(6).max(128),
  email: email,
  name: z.string().nonempty().max(128),
})

export type UserProfileFormInputType = z.infer<typeof UserProfileFormInput>

export const UserProfileUpdateData = UserProfileFormInput
export type UserProfileUpdateDataType = UserProfileFormInputType

// password

export const UserPasswordFormInput = z
  .object({
    password: password,
    passwordConfirmation: password,
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'],
  })

export type UserPasswordFormInputType = z.infer<typeof UserPasswordFormInput>
