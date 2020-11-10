import { forwardRef, TextareaHTMLAttributes } from 'react'

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string
  type: string
}
type Ref = HTMLTextAreaElement

const Textarea = forwardRef<Ref, Props>((props, ref) => (
  <>
    <textarea className="form-input w-full" {...props} ref={ref} />
  </>
))

export default Textarea
