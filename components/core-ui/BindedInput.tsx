import React, { SetStateAction } from "react"
import styled from "styled-components"
export type InputProps = {
  name?: string
  label?: string
  bindTo?: React.Dispatch<SetStateAction<any>>
  labelClassName?: string
  inputClassName?: string
  hideLabel?: boolean
  value?: any
  suffix?: JSX.Element | JSX.Element[] | React.ReactNode | undefined
}

const BindedInputContainer = styled.div`
  display: block;
`

const BindedInputLabel = styled.label`
  margin-bottom: 8px;
  display: block;
  font-size: 14px;
  color: rgb(55 65 81);
`
const BindedInputSelf = styled.input`
  margin-top: 4px;
  display: block;
  width: 100%;
  border-radius: 6px;
  border: 1px solid rgb(229 231 235);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05), 0 1px 2px 0 rgb(0 0 0 / 0.05);
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  padding: 8px 12px;
  outline: none;
  &:focus {
    box-shadow: 0 0 0 2px rgba(79 70 229 / 0.27);
    border-color: rgba(79 70 229 / 0.27);
  }
`

export const BindedInput: React.FC<InputProps> = (props) => {
  return (
    <BindedInputContainer>
      {!props.hideLabel && (
        <BindedInputLabel htmlFor={props.name}></BindedInputLabel>
      )}
      <div style={{ position: "relative" }}>
        <BindedInputSelf
          id={props.name}
          name={props.name}
          onChange={(e) => {
            const { value } = e.target
            props.bindTo((prevState) => ({ ...prevState, [props.name]: value }))
          }}
          {...props}
        />
        {props.suffix && props.suffix}
      </div>
    </BindedInputContainer>
  )
}
