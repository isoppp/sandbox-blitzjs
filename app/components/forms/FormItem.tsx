import React, { FC } from 'react'

type Props = {
  title?: string
  className?: string
}
const FormItem: FC<Props> = (props) => {
  return (
    <div className={props.className}>
      <label className="block w-full">
        {props.title && <div className="text-sm font-bold mb-2">{props.title}</div>}
        <div>{props.children}</div>
      </label>
    </div>
  )
}

export default FormItem
