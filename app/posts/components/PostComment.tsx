import { useMutation, useQuery } from '@blitzjs/core'
import getPostComments, { PostCommentsReturnValues } from 'app/posts/postComments/queries/getPostComments'
import createPostComment from 'app/posts/postComments/mutations/createPostComment'
import { Fragment, useCallback, useMemo } from 'react'
import PostCommentForm from './PostCommentForm'
import { format } from 'date-fns'
import { IoMdTrash } from 'react-icons/io'
import deletePostComment from 'app/posts/postComments/mutations/deletePostComment'
import { PostCommentFormInputType } from 'app/posts/validations'

type PostComment = PostCommentsReturnValues[0]
type PostCommentsProps = {
  postId: number
  userId: number
}

type CommentProps = {
  comment: PostComment
  onClickDelete: (id: number) => void
  userId: number
}

const Comment = (props: CommentProps) => {
  return (
    <div className="relative p-4 border">
      <p>{props.comment.content}</p>
      <div className="flex items-center gap-2 text-xs mt-3">
        <div>{format(props.comment.createdAt, 'MMM dd, hh:mm')}</div>
        <div className="font-bold">by {props.comment.user?.name}</div>
      </div>
      {props.comment.userId === props.userId && (
        <button className="absolute right-0 bottom-0 mr-4 mb-4" onClick={() => props.onClickDelete(props.comment.id)}>
          <IoMdTrash />
        </button>
      )}
    </div>
  )
}

export default function PostComments(props: PostCommentsProps) {
  const [{ postComments }, { refetch }] = useQuery(getPostComments, {
    where: { postId: props.postId },
    orderBy: { createdAt: 'desc' },
  })
  const { parentComments, childComments } = useMemo<{
    parentComments: PostComment[]
    childComments: Record<string, PostComment[]>
  }>(() => {
    const parentComments: PostComment[] = postComments.filter((comment: PostComment) => !comment.parentId)
    const childCandidates: PostComment[] = postComments.filter((comment: PostComment) => !!comment.parentId)
    const childComments = parentComments.reduce((acc: Record<string, PostComment[]>, cur: PostComment) => {
      acc[cur.id.toString()] = childCandidates.filter((candidate: PostComment) => candidate.parentId === cur.id)
      return acc
    }, {})
    return {
      parentComments,
      childComments,
    }
  }, [postComments])

  const [createPostCommentMutation] = useMutation(createPostComment)
  const [deletePostCommentMutation] = useMutation(deletePostComment)

  const onSubmit = useCallback(
    async ({ parentId, content }: PostCommentFormInputType) => {
      await createPostCommentMutation({
        data: {
          content,
          post: {
            connect: {
              id: props.postId,
            },
          },
          ...(parentId
            ? {
                parent: {
                  connect: {
                    id: parentId ? Number(parentId) : undefined,
                  },
                },
              }
            : {}),
        },
      })
      await refetch()
    },
    [createPostCommentMutation, props.postId, refetch],
  )

  const onClickDelete = useCallback(
    async (id: number) => {
      await deletePostCommentMutation({ where: { id } })
      await refetch()
    },
    [deletePostCommentMutation, refetch],
  )

  return (
    <div>
      <div className="mt-4">
        <PostCommentForm onSubmit={onSubmit} />
      </div>

      <div className="mt-6 pt-6 border-t">
        {parentComments.map((comment) => (
          <div key={comment.id} className="mt-4 first:mt-0">
            <Comment comment={comment} onClickDelete={onClickDelete} userId={props.userId} />

            <div className="pl-6 mt-3">
              {(() => {
                const children = childComments[comment.id]
                return (
                  <>
                    {children.map((childComment: PostComment) => (
                      <Fragment key={childComment.id}>
                        <div className="mt-2 first:mt-0">
                          <Comment comment={childComment} onClickDelete={onClickDelete} userId={props.userId} />
                        </div>
                      </Fragment>
                    ))}
                    <PostCommentForm onSubmit={onSubmit} initialValues={{ parentId: comment.id }} rows={1} />
                  </>
                )
              })()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
