import { forwardRef, InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string
  type: string
}
type Ref = HTMLInputElement

const InputText = forwardRef<Ref, Props>((props, ref) => (
  <>
    <input className="w-full border rounded-md py-1 px-4" {...props} ref={ref} />
  </>
))

export default InputText
