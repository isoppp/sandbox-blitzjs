import * as React from 'react'
import classNames from 'classnames'
import { createPortal } from 'react-dom'
import { IoMdClose } from 'react-icons/io'

export interface Props {
  isOpen: boolean
  closeModal: () => void
  title?: string
}

const ModalLayout: React.FC<Props> = (props) => {
  const rootClasses = classNames([
    'fixed inset-0 flex items-center justify-center z-60 transition-all',
    props.isOpen ? 'duration-150 opacity-100 visible' : 'opacity-0 invisible',
  ])

  if (typeof window === 'undefined') return <div />

  return createPortal(
    <div>
      <div className={rootClasses}>
        <div className="absolute inset-0 bg-black opacity-25" onClick={props.closeModal} />
        <div className="relative w-full max-w-165 mx-4 px-6 pb-6 bg-white rounded-md shadow-lg max-w-screen-md">
          <div>
            {props.title && (
              <div className="text-xl font-bold mb-5 text-center py-2 bg-gray-100 text-gray-600 border-b -mx-6">
                {props.title}
              </div>
            )}
            <div>{props.children}</div>
          </div>

          <div
            className="absolute top-0 right-0 mt-2 mr-3 text-3xl text-neutral-600 cursor-pointer"
            onClick={props.closeModal}
          >
            <IoMdClose />
          </div>
        </div>
      </div>
    </div>,
    window.document.body,
  )
}

export default ModalLayout
