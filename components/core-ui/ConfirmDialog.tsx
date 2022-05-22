import React from "react"
import { createPortal } from "react-dom"
import { useConfirm } from "../../modals/global/useConfirm"
import styled from "styled-components"
import { PrimaryButton } from "./Button"
import FadeIn from "./FadeIn"

const PortalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`
const ConfirmDialogStyled = styled.div`
  z-index: 999999;
  padding: 16px;
  background-color: white;
  width: 400px;
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`
const ConfirmDialogFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;

  > * + * {
    margin-left: 8px;
  }
`

const ConfirmDialog = () => {
  const { onConfirm, onCancel, confirmState } = useConfirm()
  const portalElement =
    typeof document !== "undefined" ? document.getElementById("__next") : null
  const component = confirmState.show ? (
    <FadeIn>
      <PortalOverlay>
        <ConfirmDialogStyled>
          <p>{confirmState?.text && confirmState.text}</p>
          <ConfirmDialogFooter>
            <PrimaryButton onClick={onConfirm}>Evet</PrimaryButton>
            <PrimaryButton onClick={onCancel}>İptal Et</PrimaryButton>
          </ConfirmDialogFooter>
        </ConfirmDialogStyled>
      </PortalOverlay>
    </FadeIn>
  ) : null

  return component ? createPortal(component, portalElement) : null
}

export default ConfirmDialog
