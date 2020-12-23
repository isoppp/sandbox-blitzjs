import { classNames } from 'utils/classNames'
import { IoMdClose } from 'react-icons/io'
import React from 'react'
import { getImageUrl } from 'utils/s3'

interface Props {
  url: string
  onDeleteFile(): void
}
export const UploadedImagePreview = (props: Props) => {
  return (
    <div className="flex justify-center">
      <div className="relative inline-flex mx-auto">
        <img
          src={getImageUrl(props.url)}
          alt=""
          className="block w-48 h-48 object-cover rounded-sm mx-auto shadow-md"
        />
        <button
          className={classNames([
            'absolute right-0 top-0 mt-2 mr-2',
            'p-1 text-xl shadow-md bg-gray-100 rounded-full bg-opacity-90',
            'cursor-pointer focus:outline-none',
          ])}
          onClick={props.onDeleteFile}
        >
          <IoMdClose />
        </button>
      </div>
    </div>
  )
}
