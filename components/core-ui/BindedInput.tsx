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
  &:focus {
    border-color: rgb(165 180 252);
    box-shadow: var(--tw-ring-inset) 0 0 0 0 #fff, 0 0 rgb(199 210 254),
      var(0 0 #0000, 0 0 #0000);
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

// export const BindedInput: React.FC<
//   InputProps<HTMLInputElement> &
//     React.DetailedHTMLProps<
//       React.InputHTMLAttributes<HTMLInputElement>,
//       HTMLInputElement
//     >
// > = (props) => {
//   const {
//     name,
//     label,
//     labelClassName,
//     inputClassName,
//     hideLabel = false,
//     suffix,
//     bindTo,
//     ...args
//   } = props
//   return (
//     <div className="block">
//       {!hideLabel && (
//         <label
//           className={`mb-2 block text-sm  text-gray-700 ${labelClassName}`}
//           htmlFor={name}>
//           {label}
//         </label>
//       )}
//       <div className={"relative"}>
//         <input
//           type={"text"}
//           className={`mt-1 block w-full rounded-md border-gray-200 shadow-sm transition-all focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${inputClassName}`}
//           id={name}
//           name={name}
//           onChange={(e) => {
//             const { value } = e.target
//             bindTo((prevState) => ({ ...prevState, [name]: value }))
//           }}
//           {...args}
//         />
//         {suffix && suffix}
//       </div>
//     </div>
//   )
// }
