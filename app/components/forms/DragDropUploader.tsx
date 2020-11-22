import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import Uppy, { UploadedUppyFile, UploadResult, UppyFile } from '@uppy/core'
import AwsS3 from '@uppy/aws-s3'
import DragDrop from '@uppy/react/lib/DragDrop'
import ms from 'ms'
import cuid from 'cuid'
import { isProduction } from 'constants/nodenv'
import { UploadedImagePreview } from 'app/components/forms/UploadedImagePreview'
import { AWS_S3_TEMP_DIR_NAME } from 'constants/aws-public'
import ImageCropper from 'app/components/forms/ImageCropper'
import Spinner from 'app/components/Spinner'

import '@uppy/core/dist/style.css'
import '@uppy/drag-drop/dist/style.css'

interface Props {
  uploadAsTemp?: boolean
  children(props: { uploadedImageUrl: string }): ReactNode
}

type Meta = Pick<Props, 'uploadAsTemp'>
type File = UppyFile<Meta>
type UploadedFile = UploadedUppyFile<Meta, {}>
export type AddedFile = UppyFile<Meta, {}>

const uppy = Uppy({
  debug: !isProduction,
  restrictions: {
    maxNumberOfFiles: 1,
    allowedFileTypes: ['.jpg', '.jpeg', '.png'],
    // maxFileSize: 1024 * 1024 * 10,
  },
  autoProceed: false,
})

uppy.use(AwsS3, {
  limit: 1,
  timeout: ms('1 minute'),
  getUploadParameters(file: File) {
    const { uploadAsTemp } = file.meta
    const filepath = `${uploadAsTemp ? `${AWS_S3_TEMP_DIR_NAME}/` : ''}${cuid()}-${file.name}`
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
  const [uploading, setUploading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<UploadedFile | null>(null)
  const [addedFile, setAddedFile] = useState<AddedFile | null>(null)
  const onAdded = useCallback(() => {
    setAddedFile(uppy.getFiles()[0])
  }, [])
  const onComplete = useCallback((result: UploadResult<Meta>) => {
    setUploadedImage(result?.successful?.length ? result.successful[0] : null)
    setUploading(false)
  }, [])

  const deleteUploadedFile = useCallback((_: UploadedFile) => {
    setUploadedImage(null)
    uppy.reset()
  }, [])

  const onCroppedImage = useCallback(async (file: AddedFile) => {
    uppy.removeFile(file.id)
    uppy.addFile(file)
    setAddedFile(null)
    setUploading(true)
    await uppy.upload()
  }, [])

  const onCancelCrop = useCallback(() => {
    setAddedFile(null)
    uppy.reset()
  }, [])

  useEffect(() => {
    uppy.reset()

    uppy.setMeta({
      uploadAsTemp,
    })
    uppy.on('complete', onComplete)
    uppy.on('file-added', onAdded)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (uploading) return <Spinner className="my-10" width={80} height={80} />

  return (
    <div className="max-w-screen-sm mx-auto">
      {!addedFile && !uploadedImage && (
        <DragDrop
          uppy={uppy}
          note="Images up to 512x512px"
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
      )}
      {!uploadedImage && addedFile && (
        <ImageCropper key={addedFile.id} file={addedFile} onCroppedImage={onCroppedImage} onCancelCrop={onCancelCrop} />
      )}
      {uploadedImage && (
        <UploadedImagePreview
          url={uploadedImage.uploadURL}
          onDeleteFile={() => deleteUploadedFile(uploadedImage)}
          key={uploadedImage.id}
        />
      )}

      {children && !!uploadedImage?.uploadURL && children({ uploadedImageUrl: uploadedImage?.uploadURL })}

      <style global jsx>{`
        .uppy-Root {
          font-family: var(--font-sans) !important;
        }
        .uppy-u-reset {
          color: var(--color-gray-800) !important;
        }

        .uppy-DragDrop-container {
          width: 100% !important;
          height: 160px !important;
          min-height: 160px;
          border-color: var(--color-gray-400);
          font-weight: inherit !important;
          overflow: hidden;
        }
        .uppy-DragDrop-arrow {
          display: none;
        }

        .uppy-DragDrop-label {
          font-weight: 600;
          font-size: 16px;
        }

        .uppy-DragDrop-note {
          color: var(--color-gray-600);
          font-weight: 600;
          font-size: 14px;
        }
      `}</style>
    </div>
  )
}

export default React.memo(DragDropUploader)
