import React, { useContext, useReducer } from "react"
import {
  HIDE_CONFIRM,
  initialState,
  reducer,
  SHOW_CONFIRM,
} from "../../store/reducer"

const ConfirmContext = React.createContext(null);

export const ConfirmContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <ConfirmContext.Provider value={[state, dispatch]}>
      {props.children}
    </ConfirmContext.Provider>
  )
}

let resolveCallback
export const useConfirm = () => {
  const [confirmState, dispatch] = useContext(ConfirmContext)
  const onConfirm = () => {
    closeConfirm()
    typeof resolveCallback === "function" && resolveCallback(true)
  }
  const onCancel = () => {
    closeConfirm();
    typeof resolveCallback === "function" &&  resolveCallback(false);
  }
  const useconfirm = (text) => {
    dispatch({
      type: SHOW_CONFIRM,
      payload: {
        text,
      },
    })
    return new Promise((res, rej) => {
      resolveCallback = res
    })
  }
  const closeConfirm = () => {
    dispatch({
      type: HIDE_CONFIRM,
    })
  }

  return { useconfirm, onConfirm, onCancel, confirmState }
}

export default useConfirm;
