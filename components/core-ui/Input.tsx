import React, { SetStateAction } from "react"
import styled from "styled-components"
export type InputProps = {
  name?: string
  label?: string
  bindTo?: React.Dispatch<SetStateAction<any>>
  labelClassName?: string
  inputClassName?: string
  type?: string
  hideLabel?: boolean
  value?: any
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
  suffix?: JSX.Element | JSX.Element[] | React.ReactNode | undefined
}

const InputContainer = styled.div`
  display: block;
`

const InputLabel = styled.label`
  margin-bottom: 8px;
  display: block;
  font-size: 14px;
  color: rgb(55 65 81);
`
const InputSelf = styled.input`
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

export const Input: React.FC<InputProps> = (props) => {
  return (
    <InputContainer>
      {!props.hideLabel && (
        <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
      )}
      <div style={{ position: "relative" }}>
        <InputSelf
          id={props.name}
          name={props.name}
          type={props.type}
          onChange={(e) => {
            const { value } = e.target
            props.onChange && props.onChange(e)
            props.bindTo((prevState) => ({ ...prevState, [props.name]: value }))
          }}
          {...props}
        />
        {props.suffix && props.suffix}
      </div>
    </InputContainer>
  )
}
