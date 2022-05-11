import React from "react"
import { InputProps } from "./Input"

export const Textarea: React.FC<
  InputProps<HTMLTextAreaElement> &
    React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >
> = (props) => {
  const {
    name,
    label,
    value,
    labelClassName,
    inputClassName,
    hideLabel = false,
    onChange,
    suffix,
    ...args
  } = props
  return (
    <div className="mb-4">
      {!hideLabel && (
        <label
          className={`mb-2 block text-sm  text-gray-700 ${labelClassName}`}
          htmlFor={name}>
          {label}
        </label>
      )}
      <div className={"relative"}>
        <textarea
          className={`focus:shadow-outline min-h-[300px] w-full appearance-none rounded border border-gray-200 p-input text-sm text-gray-700  focus:outline-none ${inputClassName}`}
          id={name}
          defaultValue={value}
          onChange={(e) => onChange && onChange(e)}
          {...args}
        />
        {suffix && suffix}
      </div>
    </div>
  )
}
