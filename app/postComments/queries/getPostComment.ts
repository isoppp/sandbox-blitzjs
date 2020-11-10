import { Ctx, NotFoundError } from 'blitz'
import db, { FindFirstPostCommentArgs } from 'db'

type GetPostCommentInput = Pick<FindFirstPostCommentArgs, 'where'>

export default async function getPostComment({ where }: GetPostCommentInput, ctx: Ctx) {
  ctx.session.authorize()

  const postComment = await db.postComment.findFirst({ where })

  if (!postComment) throw new NotFoundError()

  return postComment
}
