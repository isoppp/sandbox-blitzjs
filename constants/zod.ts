import * as z from 'zod'

export const password = z
  .string()
  .min(8)
  .max(128)
  .regex(RegExp('(.*[a-z].*)'))
  .regex(RegExp('(.*[A-Z].*)'))
  .regex(RegExp('(.*\\d.*)'))
  .regex(RegExp('[!@#$%^&*(),.?":{}|<>]'))

export const alphabetString = z.string().regex(RegExp('(.*[a-z].*)')).regex(RegExp('(.*[A-Z].*)'))

export const alphabetNumberString = z
  .string()
  .regex(RegExp('(.*[a-z].*)'))
  .regex(RegExp('(.*[A-Z].*)'))
  .regex(RegExp('(.*\\d.*)'))

export const urlPath = z.string().regex(RegExp('(.*[a-z].*)')).regex(RegExp('(.*\\d.*)')).regex(RegExp('(.*-.*)'))

export const numberString = z.string().regex(RegExp('(.*\\d.*)'))

export const email = z.string().email()
