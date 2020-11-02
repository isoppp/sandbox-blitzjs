import db from './index'
import { USER_ROLE } from '../utils/userRole'
import { hashPassword } from '../app/auth/auth-utils'

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const seed = async () => {
  for (const name of Object.values(USER_ROLE)) {
    await db.role.create({
      data: {
        name,
      },
    })
  }

  await db.user.create({
    data: {
      name: 'admin',
      email: 'admin@example.com',
      hashedPassword: await hashPassword('exampleadmin'),
      roles: {
        connect: [
          {
            name: USER_ROLE.Admin,
          },
          {
            name: USER_ROLE.User,
          },
        ],
      },
    },
  })
}

export default seed
