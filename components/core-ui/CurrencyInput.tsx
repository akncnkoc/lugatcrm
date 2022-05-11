import React, { useState } from "react"
import { formatMoney } from "../../lib/currency-conversion"
import { Input, InputProps } from "./Input"

export type CurrencyInputProps = {
  onInputChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => void
  currencyValue: string
  seperator: "." | ","
} & InputProps<HTMLInputElement> &
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
        <div className={"absolute right-4 top-1/2 -translate-y-1/2 transform"}>
          <span className={"text-sm font-light text-gray-400"}>
            {adapter.value}
          </span>
        </div>
      }
    />
  )
}
