import { FC, useCallback, useEffect, useRef, useState } from 'react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { AddedFile } from 'app/components/forms/DragDropUploader'

interface Props {
  file: AddedFile

  onCroppedImage(file: AddedFile): void
  onCancelCrop(): void
}

const ImageCropper: FC<Props> = (props) => {
  const cropperRef = useRef<HTMLImageElement>(null)
  const [base64, setBase64] = useState('')

  console.log(props.file.type)
  const onDecided = useCallback(() => {
    const imageElement: any = cropperRef?.current
    const cropper: any = imageElement?.cropper
    cropper.getCroppedCanvas({ minWidth: 512, maxHeight: 512 }).toBlob(
      (blob) => {
        props.onCroppedImage({
          ...props.file,
          data: blob,
        })
      },
      props.file.type,
      0.9,
    )
  }, [props])

  useEffect(() => {
    var reader = new FileReader()
    reader.readAsDataURL(props.file.data)
    reader.onloadend = function () {
      var base64data = reader.result
      // console.log(base64data);
      if (typeof base64data === 'string') {
        setBase64(base64data)
      }
    }
  }, [props.file])

  if (!base64) return <div />

  return (
    <>
      <Cropper
        src={base64}
        style={{ minHeight: 256, width: '100%' }}
        ref={cropperRef}
        // Cropper.js options
        // viewMode={1}
        // dragMode={'move'}
        aspectRatio={1}
      />
      <div className="flex justify-center gap-4 mt-6">
        <button
          className="border rounded-md py-2 px-4 focus:outline-none text-gray-600 font-bold"
          onClick={props.onCancelCrop}
        >
          Cancel
        </button>
        <button
          className="border rounded-md py-2 px-4 focus:outline-none bg-teal-600 text-white font-bold"
          onClick={onDecided}
        >
          Crop
        </button>
      </div>
    </>
  )
}

export default ImageCropper
