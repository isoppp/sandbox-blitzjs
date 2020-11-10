import { Ctx } from 'blitz'
import db, { PostCommentUpdateArgs } from 'db'

type UpdatePostCommentInput = Pick<PostCommentUpdateArgs, 'where' | 'data'>

export default async function updatePostComment({ where, data }: UpdatePostCommentInput, ctx: Ctx) {
  ctx.session.authorize()

  const postComment = await db.postComment.update({
    where,
    data,
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })

  return postComment
}
