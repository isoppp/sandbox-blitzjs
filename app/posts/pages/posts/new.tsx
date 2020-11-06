import React from 'react'
import Layout from 'app/layouts/Layout'
import { Link, useRouter, useMutation, BlitzPage } from 'blitz'
import createPost from 'app/posts/mutations/createPost'
import PostForm from 'app/posts/components/PostForm'
import { useCurrentUserFromSession } from '../../../hooks/useCurrentUser'

const NewPostPage: BlitzPage = () => {
  return (
    <div>
      <h1>Create New Post</h1>

      <PostForm />
    </div>
  )
}

NewPostPage.getLayout = (page) => <Layout title={'Create New Post'}>{page}</Layout>

export default NewPostPage
