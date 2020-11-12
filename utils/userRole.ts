export const USER_ROLE = {
  Admin: 'USER_ROLE_ADMIN',
  User: 'USER_ROLE_USER',
} as const

export type UserRole = typeof USER_ROLE[keyof typeof USER_ROLE]
