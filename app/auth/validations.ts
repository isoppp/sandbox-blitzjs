import * as z from 'zod'
import { email, password } from 'constants/zod'

export const SignupInput = z.object({
  email: z.string().email(),
  password: z.string().min(10).max(100),
})
export type SignupInputType = z.infer<typeof SignupInput>

export const LoginInput = z.object({
  email: email,
  password: password,
})
export type LoginInputType = z.infer<typeof LoginInput>
