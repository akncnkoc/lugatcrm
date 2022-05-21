import React, { useEffect, useRef } from "react"
import { IoIosCloseCircle } from "react-icons/io"
import styled from "styled-components"

type ModalProps = {
  modal?: any
  children?: React.ReactNode
  unSetModal?: any
  staticBackdrop?: boolean
}

const ModalBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  height: 100%;
  width: 100%;
  user-select: none;
  background-color: rgba(0, 0, 0, 0.1);
  outline: none;
`

const ModalContainer = styled.div`
  transform: translate(0, -200px);
  margin: 1.75rem auto;
  width: auto;
  max-width: 800px;
  border-radius: 6px;
  padding: 16px;
  overflow: hidden;
  position: relative;
  visibility: hidden;
  opacity: 0;
  transition: 500ms all;
`
const ModalCloseContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  height: 70px;
  cursor: pointer;
  font-size: 24px;
  color: rgb(107 114 128);
`
const Modal: React.FC<ModalProps> = (props) => {
  const { modal, unSetModal, staticBackdrop } = props
  const modalContainer = useRef<HTMLDivElement>(null)
  const modalContentContainer = useRef<HTMLDivElement>(null)
  const closeModal = () => {
    modalContentContainer.current.style.transform = "translate(0,-200px)"
    modalContentContainer.current.style.visibility = "hidden"
    modalContentContainer.current.style.opacity = "0"
    setTimeout(() => unSetModal(), 200)
  }
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
      if (e.target === modalContainer.current && !staticBackdrop) closeModal()
    }

    document.addEventListener("keyup", bind)
    if (modalContentContainer.current) {
      modalContentContainer.current.style.transform = "translate(0,0)"
      modalContentContainer.current.style.visibility = "visible"
      modalContentContainer.current.style.opacity = "1"
    }
    modalContainer.current.addEventListener("mousedown", outsideClick)
    return () => document.removeEventListener("keyup", bind)
  }, [modal, unSetModal, staticBackdrop])

  return (
    <ModalBackdrop ref={modalContainer}>
      <ModalContainer
        className={`show`}
        id={"modal"}
        ref={modalContentContainer}>
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <div style={{ position: "relative" }}>
            <ModalCloseContainer onClick={() => closeModal()}>
              <IoIosCloseCircle style={{ fontSize: "30px" }} />
            </ModalCloseContainer>
          </div>
          {modal}
        </div>
      </ModalContainer>
    </ModalBackdrop>
  )
}

export default Modal
