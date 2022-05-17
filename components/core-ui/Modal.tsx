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
  height: 100vh;
  width: 100vw;
  user-select: none;
  background-color: rgba(0, 0, 0, 0.1);
`

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  max-height: min-content;
  min-width: 500px;
  transform: translate(-50%, -50%);
  border-radius: 6px;
  background-color: white;
  padding: 16px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
`
const ModalCloseContainer = styled.div`
  position: absolute;
  top: -56px;
  right: -16px;
  height: 132px;
  cursor: pointer;
  font-size: 24px;
  color: rgb(107 114 128);
`
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
    <ModalBackdrop ref={modalContainer}>
      <ModalContainer className={`show`} id={"modal"}>
        <div style={{ position: "relative" }}>
          <ModalCloseContainer onClick={() => unSetModal()}>
            <IoIosCloseCircle style={{ fontSize: "30px" }} />
          </ModalCloseContainer>
        </div>
        <div style={{position: "relative", width: "100%", height: "100%"}}>{modal}</div>
      </ModalContainer>
    </ModalBackdrop>
  )
}

export default Modal
