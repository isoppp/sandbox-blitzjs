import { forwardRef, InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string
  type: string
}
type Ref = HTMLInputElement

const InputText = forwardRef<Ref, Props>((props, ref) => (
  <>
    <input className="form-input w-full" {...props} ref={ref} />
  </>
))

export default InputText
