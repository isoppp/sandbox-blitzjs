import * as z from 'zod'

// Post
export const PostFormInput = z.object({
  slug: z.string().max(128).optional(),
  title: z.string().min(1).max(256),
  content: z.string().min(10).max(4048),
})

export type PostFormInputType = z.infer<typeof PostFormInput>

export const PostCreateData = z
  .object({
    slug: z.string().nonempty().max(128).optional(),
  })
  .merge(PostFormInput.omit({ slug: true }))

export type PostCreateDataType = z.infer<typeof PostCreateData>

export const PostUpdateData = z
  .object({
    slug: z.string().nonempty().max(128),
  })
  .merge(PostFormInput.omit({ slug: true }))

export type PostUpdateDataType = z.infer<typeof PostCreateData>

// PostComment
export const PostCommentFormInput = z.object({
  parentId: z.string().optional(),
  content: z.string().nonempty(),
})

export type PostCommentFormInputType = z.infer<typeof PostCommentFormInput>

export const PostCommentCreateData = z.object({
  content: z.string().nonempty(),
  parent: z.record(z.any()).optional(),
  post: z.record(z.any()),
})

export type PostCommentCreateDataType = z.infer<typeof PostCommentCreateData>
