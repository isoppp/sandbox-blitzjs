import { PostComment, User } from 'db'
import { useMutation, useQuery } from '@blitzjs/core'
import getPostComments from 'app/postComments/queries/getPostComments'
import createPostComment from 'app/postComments/mutations/createPostComment'
import { Fragment, useCallback, useMemo } from 'react'
import PostCommentForm, { PostCommentFormValues } from './PostCommentForm'
import { format } from 'date-fns'
import { IoMdTrash } from 'react-icons/io'
import deletePostComment from 'app/postComments/mutations/deletePostComment'

type PostCommentsProps = {
  postId: number
  userId: number
}

type CommentProps = {
  comment: PostComment & { user: User }
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
    orderBy: { id: 'asc' },
  })
  const { parentComments, childComments } = useMemo(() => {
    const parentComments = postComments.filter((comment) => !comment.parentId)
    const childCandidates = postComments.filter((comment) => !!comment.parentId)
    const childComments = parentComments.reduce((acc, cur) => {
      acc[cur.id.toString()] = childCandidates.filter((candidate) => candidate.parentId === cur.id)
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
    async ({ parentId, content }: PostCommentFormValues) => {
      await createPostCommentMutation({
        data: {
          content,
          post: {
            connect: {
              id: props.postId,
            },
          },
          user: {
            connect: {
              id: props.userId,
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
    [createPostCommentMutation, props.postId, props.userId, refetch],
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
        <PostCommentForm onSubmit={onSubmit} initialValues={{}} />
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
                    {children.map((childComment) => (
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
