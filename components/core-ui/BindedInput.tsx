import React, { SetStateAction } from "react"

export type InputProps<T> = {
  name?: string
  label?: string
  bindTo?: React.Dispatch<SetStateAction<any>>
  labelClassName?: string
  inputClassName?: string
  hideLabel?: boolean
  suffix?: JSX.Element | JSX.Element[] | React.ReactNode | undefined
}

export const BindedInput: React.FC<
  InputProps<HTMLInputElement> &
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
> = (props) => {
  const {
    name,
    label,
    labelClassName,
    inputClassName,
    hideLabel = false,
    suffix,
    bindTo,
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
          className={`mt-1 block w-full rounded-md border-gray-200 shadow-sm transition-all focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${inputClassName}`}
          id={name}
          name={name}
          onChange={(e) => {
            const { value } = e.target
            bindTo((prevState) => ({ ...prevState, [name]: value }))
          }}
          {...args}
        />
        {suffix && suffix}
      </div>
    </div>
  )
}
