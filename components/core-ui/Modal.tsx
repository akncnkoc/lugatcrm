import React, { useEffect, useRef } from "react"
import { IoIosCloseCircle } from "react-icons/io"

type ModalProps = {
  modal?: any
  children?: React.ReactNode
  unSetModal?: any
  staticBackdrop?: boolean
}

const Modal: React.FC<ModalProps> = (props) => {
  const { modal, unSetModal, staticBackdrop } = props
  const modalContainer = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const bind = (e: KeyboardEvent) => {
      if (e.code != "Escape") return
      if (
        document.activeElement &&
        ["INPUT", "SELECT"].includes(document.activeElement.tagName)
      )
        return
      if (staticBackdrop) return
      unSetModal()
    }
    const outsideClick = (e: MouseEvent) => {
      if (e.target === modalContainer.current && !staticBackdrop) unSetModal()
    }
    document.addEventListener("keyup", bind)
    modalContainer.current.addEventListener("mousedown", outsideClick)
    return () => document.removeEventListener("keyup", bind)
  }, [modal, unSetModal, staticBackdrop])

  return (
    <div
      ref={modalContainer}
      className={
        "absolute top-0 left-0 z-999 h-screen w-screen select-none bg-black/10"
      }>
      <div
        className={`show fixed top-1/2 bottom-7 left-1/2 max-h-min min-w-500px -translate-y-1/2 -translate-x-1/2 transform rounded-md bg-white p-4 shadow`}
        id={"modal"}>
        <div className={"relative"}>
          <div
            onClick={() => unSetModal()}
            className={
              "absolute -top-14 -right-4 h-32 cursor-pointer text-2xl text-gray-500"
            }>
            <IoIosCloseCircle className={"text-3xl"} />
          </div>
        </div>
        <div className={"relative h-full w-full"}>{modal}</div>
      </div>
    </div>
  )
}

export default Modal
