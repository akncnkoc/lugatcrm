import React, { HTMLAttributes, SetStateAction } from "react"
import styled from "styled-components"

export type InputProps = {
  name?: string
  label?: string
  bindTo?: React.Dispatch<SetStateAction<any>>
  type?: string
  hideLabel?: boolean
  value?: any
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
  suffix?: JSX.Element | JSX.Element[] | React.ReactNode | undefined
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const InputContainer = styled.div`
  display: block;
`

const InputLabel = styled.label`
  font-size: 1rem;
  font-weight: 400;
  color: #3f4254;
  display: inline-block;
  margin-bottom: 0.5rem;
`
const InputSelf = styled.input<any>`
  display: block;
  width: 100%;
  height: calc(1.5em + 1.3rem + 2px);
  padding: 0.65rem 1rem;
  font-size: 1rem;
  font-weight: 400;
  color: #3f4254;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #e4e6ef;
  box-shadow: none;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  overflow: visible;
  margin: 0;
  border-radius: 0.42rem;

  &:focus {
    border-color: #69b3ff;
    outline: 0;
    box-shadow: none !important;
  }
`

export const Input: React.FC<InputProps> = (props) => {
  const { name, label, type, hideLabel, onChange,suffix, bindTo, ...args } = props
  return (
    <InputContainer>
      {!hideLabel && <InputLabel htmlFor={name}>{label}</InputLabel>}
      <div style={{ position: "relative" }}>
        <InputSelf
          id={name}
          name={name}
          type={type}
          onChange={(e) => {
            const { value } = e.target
            onChange && onChange(e)
            bindTo && bindTo((prevState) => ({ ...prevState, [name]: value }))
          }}
          {...args}
        />
        {suffix && suffix}
      </div>
    </InputContainer>
  )
}
