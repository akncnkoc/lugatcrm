import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from "react"
import Modal from "../components/core-ui/Modal"

//FIXME: find to way to make sense
type ModalContextProps = {
  setModal?: Dispatch<SetStateAction<any>>
  setStaticBackdrop?: Dispatch<SetStateAction<any>>
  unSetModal?: Function
}

const ModalContext = React.createContext<ModalContextProps>(null)

export const ModalProvider = (props) => {
  const [modal, setModal] = useState<null>(null)
  const [staticBackdrop, setStaticBackdrop] = useState(false)

  const unSetModal = useCallback(() => {
    setModal(null)
  }, [setModal])
  return (
    <ModalContext.Provider
      value={{ unSetModal, setModal, setStaticBackdrop }}
      {...props}>
      {props.children}
      {modal && (
        <Modal
          modal={modal}
          unSetModal={unSetModal}
          staticBackdrop={staticBackdrop}
        />
      )}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (context === undefined)
    throw new Error("useModal must be withing a provider")
  return context
}
