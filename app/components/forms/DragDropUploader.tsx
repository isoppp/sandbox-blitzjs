import React, { ReactNode, useCallback, useState } from 'react'
import Uppy, { UploadedUppyFile, UploadResult, UppyFile } from '@uppy/core'
import AwsS3 from '@uppy/aws-s3'
import DragDrop from '@uppy/react/lib/DragDrop'
import ms from 'ms'
import cuid from 'cuid'
import { IoMdClose } from 'react-icons/io'
import { classNames } from 'utils/classNames'
import { isProduction } from 'constants/nodenv'

import '@uppy/core/dist/style.css'
import '@uppy/drag-drop/dist/style.css'

interface Props {
  uploadAsTemp?: boolean
  children(props: { uploadedImageUrls: string[] }): ReactNode
}

type Meta = Pick<Props, 'uploadAsTemp'>
type File = UppyFile<Meta>
type UploadedFile = UploadedUppyFile<Meta, {}>

const uppy = Uppy({
  debug: !isProduction,
  restrictions: {
    maxNumberOfFiles: 1,
    allowedFileTypes: ['.jpg', '.jpeg', '.png', '.gif'],
    maxFileSize: 1024 * 1024 * 10,
  },
  autoProceed: true,
})

uppy.use(AwsS3, {
  limit: 1,
  timeout: ms('1 minute'),
  getUploadParameters(file: File) {
    const { uploadAsTemp } = file.meta
    const filepath = `${uploadAsTemp ? 'tmp/' : ''}${cuid()}-${file.name}`
    return fetch('/api/upload/s3-sign', {
      method: 'post',
      // Send and receive JSON.
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        filename: filepath,
        contentType: file.type,
      }),
    })
      .then((response) => {
        // Parse the JSON response.
        return response.json()
      })
      .then((data) => {
        // Return an object in the correct shape.
        return {
          method: data.method,
          url: data.url,
          fields: data.fields,
          headers: data.headers,
        }
      })
  },
})

const DragDropUploader = ({ uploadAsTemp = true, children }: Props) => {
  const [uploadedImages, setUploadedImages] = useState<null | UploadedFile[]>(null)
  const onComplete = useCallback((result: UploadResult<Meta>) => {
    console.log(result)
    setUploadedImages(result?.successful?.length ? result.successful : null)
  }, [])

  const deleteUploadedFile = useCallback(
    (file: UploadedFile) => {
      const nextImages = [...(uploadedImages ?? [])].filter((f) => f.id !== file.id)
      setUploadedImages(nextImages)
      uppy.removeFile(file.id)
    },
    [uploadedImages],
  )

  uppy.setMeta({
    uploadAsTemp,
  })
  uppy.on('complete', onComplete)

  return (
    <>
      <DragDrop
        uppy={uppy}
        note="Images up to 200×200px"
        locale={{
          strings: {
            // Text to show on the droppable area.
            // `%{browse}` is replaced with a link that opens the system file selection dialog.
            dropHereOr: 'Drop here or %{browse}',
            // Used as the label for the link that opens the system file selection dialog.
            browse: 'browse',
          },
        }}
      />
      {(uploadedImages ?? []).map((uploadedImage) => (
        <div className="relative" key={uploadedImage.id}>
          <img src={uploadedImage?.uploadURL} alt="" />
          <button
            className={classNames([
              'absolute right-0 top-0 mt-4 mr-4',
              'p-1 text-2xl shadow-md bg-gray-100 rounded-full',
              'cursor-pointer focus:outline-none',
            ])}
            onClick={() => deleteUploadedFile(uploadedImage)}
          >
            <IoMdClose />
          </button>
        </div>
      ))}

      {children && children({ uploadedImageUrls: (uploadedImages ?? []).map((img) => img.uploadURL) })}
    </>
  )
}

export default React.memo(DragDropUploader)