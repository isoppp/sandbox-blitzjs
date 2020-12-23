import React, { FC } from 'react'
import { FieldError } from 'react-hook-form'

type Props = {
  title?: string
  className?: string
  error?: FieldError
  optional?: boolean
}
const FormItem: FC<Props> = (props) => {
  return (
    <div className={props.className}>
      <label className="block w-full">
        {props.title && (
          <div className="mb-2">
            {!props.optional && <span className="text-sm font-bold text-red-600">* </span>}
            {props.title && <span className="text-sm font-bold">{props.title}</span>}
          </div>
        )}

        <div>{props.children}</div>
        {props?.error?.message && <div className="mt-2 text-sm text-red-600">{props.error.message}</div>}
      </label>
    </div>
  )
}

export default FormItem
