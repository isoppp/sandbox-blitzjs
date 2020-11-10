import { Ctx } from 'blitz'
import db, { PostCommentDeleteArgs } from 'db'

type DeletePostCommentInput = Pick<PostCommentDeleteArgs, 'where'>

export default async function deletePostComment({ where }: DeletePostCommentInput, ctx: Ctx) {
  ctx.session.authorize()

  const postComment = await db.postComment.delete({ where })

  return postComment
}
