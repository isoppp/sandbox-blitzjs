import React, { useCallback, useMemo } from 'react'
import Layout from 'app/layouts/Layout'
import { BlitzPage, GetServerSideProps, invokeWithMiddleware, PromiseReturnType, useMutation, useRouter } from 'blitz'
import getPost from 'app/posts/queries/getPost'
import updatePost from 'app/posts/mutations/updatePost'
import PostForm from 'app/posts/components/PostForm'
import superjson from 'superjson'
import { Post } from 'db'
import { getSessionContext } from '@blitzjs/server'
import { shouldBeSame, shouldHaveRole, validateAuthorizationConditions } from '../../../../../utils/authorization'
import { USER_ROLE } from '../../../../../utils/userRole'
import { PostFormInputType } from 'app/posts/validations'

export const getServerSideProps: GetServerSideProps<{ [key: string]: any }, { slug: string }> = async (context) => {
  const post = await invokeWithMiddleware(getPost, { where: { slug: context?.params?.slug } }, context)
  const dataString = superjson.stringify(post)
  const session = await getSessionContext(context.req, context.res)
  validateAuthorizationConditions([
    !!session.userId,
    shouldBeSame(post.authorId, Number(session.userId)),
    shouldHaveRole(session?.publicData?.roles ?? [], USER_ROLE.Admin),
  ])

  return {
    props: {
      post: dataString,
    }, // will be passed to the page component as props
  }
}

export const EditPost = ({ post }: { post: Post }) => {
  const router = useRouter()
  const [updatePostMutation] = useMutation(updatePost)
  const onSubmit = useCallback(
    async (data: PostFormInputType) => {
      try {
        const updated = await updatePostMutation({
          where: { id: post.id },
          data,
        })
        alert('Success!' + JSON.stringify(updated))
        router.push(`/posts/${updated.slug}`)
      } catch (error) {
        alert('Error creating post ' + JSON.stringify(error, null, 2))
      }
    },
    [post.id, router, updatePostMutation],
  )

  return (
    <div>
      <h1>Edit Post {post.id}</h1>
      <pre>{JSON.stringify(post)}</pre>

      <PostForm initialValues={post} onSubmit={onSubmit} />
    </div>
  )
}

const EditPostPage: BlitzPage<{ post: string }> = (props) => {
  const post = useMemo(() => superjson.parse(props.post), [props.post]) as PromiseReturnType<typeof getPost>
  return (
    <div>
      <EditPost post={post} />
    </div>
  )
}

EditPostPage.getLayout = (page) => <Layout title={'Edit Post'}>{page}</Layout>

export default EditPostPage
