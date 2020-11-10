import { Ctx } from 'blitz'
import db, { PostCommentCreateArgs } from 'db'

type CreatePostCommentInput = Pick<PostCommentCreateArgs, 'data'>
export default async function createPostComment({ data }: CreatePostCommentInput, ctx: Ctx) {
  ctx.session.authorize()

  const postComment = await db.postComment.create({
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
