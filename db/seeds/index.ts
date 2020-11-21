import db from '../index'
import { USER_ROLE } from '../../utils/userRole'
import { hashPassword } from '../../app/auth/auth-utils'

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

  const userAdmin = await db.user.create({
    data: {
      email: 'admin@example.com',
      hashedPassword: await hashPassword('example'),
      name: 'admin',
      imageUrl: 'http://placekitten.com/350/350',
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

  const user = await db.user.create({
    data: {
      email: 'user@example.com',
      hashedPassword: await hashPassword('example'),
      name: 'user',
      imageUrl: 'http://placekitten.com/350/350',
      roles: {
        connect: [
          {
            name: USER_ROLE.User,
          },
        ],
      },
    },
  })

  const user2 = await db.user.create({
    data: {
      email: 'user2@example.com',
      hashedPassword: await hashPassword('example'),
      name: 'user',
      imageUrl: 'http://placekitten.com/350/350',
      roles: {
        connect: [
          {
            name: USER_ROLE.User,
          },
        ],
      },
    },
  })

  const post = await db.post.create({
    data: {
      title: 'Test Post',
      content: 'test post content',
      author: {
        connect: {
          id: user.id,
        },
      },
    },
  })

  await db.post.create({
    data: {
      title: 'Test Post',
      content: 'test post content',
      author: {
        connect: {
          id: user2.id,
        },
      },
    },
  })

  const comment = await db.postComment.create({
    data: {
      content: 'Good Post!',
      post: {
        connect: {
          id: post.id,
        },
      },
      user: {
        connect: {
          id: userAdmin.id,
        },
      },
    },
  })

  const commentReply = await db.postComment.create({
    data: {
      content: 'Thanks!',
      post: {
        connect: {
          id: post.id,
        },
      },
      user: {
        connect: {
          id: user.id,
        },
      },
      parent: {
        connect: {
          id: comment.id,
        },
      },
    },
  })

  const like = await db.likePost.create({
    data: {
      post: {
        connect: {
          id: post.id,
        },
      },
      user: {
        connect: {
          id: userAdmin.id,
        },
      },
    },
  })
}

export default seed
