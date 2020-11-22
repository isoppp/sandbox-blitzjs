import { classNames } from 'utils/classNames'
import { IoMdClose } from 'react-icons/io'
import React from 'react'
import { AWS_S3_PATH } from 'constants/aws-public'

interface Props {
  url: string
  onDeleteFile(): void
}
export const UploadedImagePreview = (props: Props) => {
  const isFullPath = props.url.startsWith('http')
  const imgPath = isFullPath ? props.url : `${AWS_S3_PATH}/${props.url}`
  return (
    <div className="flex justify-center">
      <div className="relative inline-flex mx-auto">
        <img src={imgPath} alt="" className="block w-64 h-64 object-cover rounded-sm mx-auto" />
        <button
          className={classNames([
            'absolute right-0 top-0 mt-4 mr-4',
            'p-1 text-2xl shadow-md bg-gray-100 rounded-full',
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
