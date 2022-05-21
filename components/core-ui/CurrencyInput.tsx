import React, { useState } from "react"
import { formatMoney } from "../../lib/currency-conversion"
import { Input, InputProps } from "./Input"

export type CurrencyInputProps = {
  onInputChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => void
  currencyValue: string
  seperator?: "." | ","
} & InputProps &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >

export const CurrencyInput: React.FC<CurrencyInputProps> = (props) => {
  const { onInputChange, currencyValue, seperator, ...args } = props
  const [adapter, setAdapter] = useState({
    value: currencyValue || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    const valueAsCurrency = formatMoney(value.replace(/[^0-9]/g, ""))
    setAdapter((prevState) => ({ ...prevState, value: valueAsCurrency }))
    if (onInputChange) {
      e.persist()
      onInputChange(e, valueAsCurrency.replace(/[^0-9]/g, ""))
    }
  }

  return (
    <Input
      value={adapter.value}
      onChange={(e) => handleChange(e)}
      {...args}
      suffix={
        <div
          style={{
            position: "absolute",
            right: "16px",
            top: "50%",
            transform: "translate(0, -50%)",
          }}>
          <span
            style={{
              fontSize: "13px",
              color: "#ededed",
            }}>
            {adapter.value}
          </span>
        </div>
      }
    />
  )
}
