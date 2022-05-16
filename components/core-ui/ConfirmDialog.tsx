import React from "react"
import { createPortal } from "react-dom"
import { useConfirm } from "./../../modals/global/useConfirm"

const ConfirmDialog = () => {
  const { onConfirm, onCancel, confirmState } = useConfirm()
  const portalElement = typeof document !== "undefined" ? document.getElementById("__next") : null;
  const component = confirmState.show ? (
    <div className="portal-overlay">
      <div className="confirm-dialog">
        <p>{confirmState?.text && confirmState.text}</p>
        <div className="confirm-dialog__footer">
          <div className="btn" onClick={onConfirm}>
            Evet
          </div>
          <div className="btn" onClick={onCancel}>
            İptal Et
          </div>
        </div>
      </div>
    </div>
  ) : null

  return component ? createPortal(component, portalElement) : null;
}

export default ConfirmDialog;
