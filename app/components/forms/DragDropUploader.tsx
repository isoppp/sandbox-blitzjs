import React from 'react'
import Uppy from '@uppy/core'
import AwsS3 from '@uppy/aws-s3'
import { DragDrop } from '@uppy/react'
import ms from 'ms'

const uppy = Uppy({
  debug: true,
  meta: { type: 'avatar' },
  restrictions: { maxNumberOfFiles: 1 },
  autoProceed: true,
})

uppy.use(AwsS3, {
  limit: 1,
  timeout: ms('1 minute'),
  getUploadParameters(file) {
    // Send a request to our PHP signing endpoint.
    return fetch('/api/upload/s3-sign', {
      method: 'post',
      // Send and receive JSON.
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        filename: file.name,
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

uppy.on('complete', (result) => {
  const url = result.successful[0].uploadURL
  // store.dispatch({
  //   type: 'SET_USER_AVATAR_URL',
  //   payload: { url: url }
  // })
  console.log(url)
})

const DragDropUploader = () => {
  return (
    <DragDrop
      uppy={uppy}
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
  )
}

export default DragDropUploader
