import { Ctx } from 'blitz'
import db from 'db'
import { PostCommentCreateData, PostCommentCreateDataType } from 'app/posts/validations'

export default async function createPostComment({ data }: { data: PostCommentCreateDataType }, ctx: Ctx) {
  ctx.session.authorize()
  const parsed = PostCommentCreateData.parse(data)
  const postComment = await db.postComment.create({
    data: {
      ...parsed,
      user: {
        connect: {
          id: ctx.session.userId,
        },
      },
    },
  })

  return postComment
}
