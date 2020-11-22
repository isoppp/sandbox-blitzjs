import * as z from 'zod'

export const PostFormInput = z.object({
  slug: z.string().max(128).optional(),
  title: z.string().min(1).max(256),
  content: z.string().min(10).max(4048),
})

export type PostFormInputType = z.infer<typeof PostFormInput>

export const PostMutationInput = z
  .object({
    slug: z.string().nonempty().max(128).optional(),
  })
  .merge(PostFormInput.omit({ slug: true }))

export type PostMutationInputType = z.infer<typeof PostMutationInput>
