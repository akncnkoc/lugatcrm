import React, { createRef } from "react"
import { InputProps } from "./Input"
import styled from "styled-components"
import CurrencyFormat from "react-currency-format"

export type CurrencyInputProps = {
  onInputChange?: (value: string) => void
  seperator?: "." | ","
} & InputProps &
  React.DetailedHTMLProps<
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

export const CurrencyInput: React.FC<CurrencyInputProps> = (props) => {
  const {
    onInputChange,
    seperator,
    onChange,
    value,
    name,
    bindTo,
    suffix,
    hideLabel,
    label,
    type,
    ...args
  } = props
  const inputRef = createRef<HTMLInputElement>()

  return (
    <InputContainer>
      {!hideLabel && <InputLabel htmlFor={name}>{label}</InputLabel>}
      <div style={{ position: "relative" }}>
        <CurrencyFormat
          value={value}
          thousandSeparator={true}
          prefix={"₺"}
          onValueChange={(values) => {
            const { formattedValue, value } = values
            onInputChange(value)
          }}
          className={"currencyInputClass"}
        />
        {suffix && suffix}
      </div>
    </InputContainer>
  )
}
