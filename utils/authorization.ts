import { AuthorizationError } from 'blitz'
import { Nullable } from 'Union/Nullable'
import { UserRole } from './userRole'

export const validateAuthorizationConditions = (conditions: boolean[]): void => {
  if (!conditions.some((condition) => condition)) {
    throw new AuthorizationError()
  }
}

export const shouldBeSame = (a: Nullable<number>, b: Nullable<number>): boolean => {
  return a != null && b != null && a === b
}

export const shouldHaveRole = (userRoles: Nullable<string[]>, role: UserRole | UserRole[]) => {
  if (Array.isArray(role)) {
    return (userRoles ?? []).some((userRole) => role.includes(userRole as UserRole))
  } else {
    return (userRoles ?? []).some((userRole) => userRole === role)
  }
}
