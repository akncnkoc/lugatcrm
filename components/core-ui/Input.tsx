import React from "react"

export type InputProps<T> = {
  name?: string
  label?: string
  value?: string
  labelClassName?: string
  inputClassName?: string
  hideLabel?: boolean
  onChange?: React.ChangeEventHandler<T> | undefined
  suffix?: JSX.Element | JSX.Element[] | React.ReactNode | undefined
}

export const Input: React.FC<
  InputProps<HTMLInputElement> &
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
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
    <div className="block">
      {!hideLabel && (
        <label
          className={`mb-2 block text-sm  text-gray-700 ${labelClassName}`}
          htmlFor={name}>
          {label}
        </label>
      )}
      <div className={"relative"}>
        <input
          type={"text"}
          className={`mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all ${inputClassName}`}
          id={name}
          step={"any"}
          defaultValue={value}
          onChange={(e) => onChange && onChange(e)}
          {...args}
        />
        {suffix && suffix}
      </div>
    </div>
  )
}
