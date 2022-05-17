import React from "react"
import Link from "next/link"
import styled from "styled-components"
import { VscLoading } from "react-icons/vsc"

type ButtonProps = {
  bgColor?: string
  hidden?: boolean
  ref?: string | undefined
  icon?: string | React.ReactNode | React.ReactNode[]
  loading?: boolean
  children?: string | React.ReactNode | React.ReactNode[]
}

const ButtonStyled = styled.button<ButtonProps>`
  position: relative;
  border-radius: 6px;
  background-color: rgb(79 70 229 / 1);
  padding: 10px 16px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: white;
  &:hover {
    background-color: rgb(55 48 163 / 1);
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    pointer-events: none;
    opacity: 50%;
  }
  display: ${(props) => props.icon ? "flex": "block"};
  align-items: ${(props) => props.icon ? "center" : "start"};
  visibility: ${(props) => props.hidden && "hidden"};
`

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <ButtonStyled icon={props.icon} hidden={props.hidden}>
      {props.loading && (
        <div
          style={{
            display: "flex",
            justifyItems: "center",
          }}>
          <VscLoading className="animate-spin text-base" />
        </div>
      )}
      {props.icon && (
        <span
          style={{
            display: "block",
            marginRight: props.children && "4px",
          }}>
          {props.icon}
        </span>
      )}
      {props.children}
    </ButtonStyled>
  )
}

// export const Button: React.FC<ButtonProps> = (props) => {
//   const {
//     children,
//     bgColor,
//     className,
//     disabled = false,
//     hidden = false,
//     loading = false,
//     ref,
//     icon,
//     ...args
//   } = props

//   const buttonRef = React.createRef<HTMLButtonElement>()
//   return (
//     <button
//       ref={buttonRef}
//       className={`relative rounded-md bg-indigo-700 py-2.5 px-4 text-center text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800
//       ${(bgColor && bgColor) || "bg-indigo-600"} text-white
//        ${disabled && "pointer-events-none disabled:opacity-50"}
//        ${icon && "flex items-center"}
//        ${hidden && "hidden"}
//        ${className}
//       `}
//       disabled={disabled}
//       {...args}>
//       {icon && <span className={`${children && "mr-1"} block`}>{icon}</span>}
//       {loading && (
//         <div className="flex justify-center">
//           <VscLoading className="animate-spin text-base" />
//         </div>
//       )}
//       {children && !loading && children}
//     </button>
//   )
// }
export const LinkButton: React.FC<{ to: string } & ButtonProps> = (props) => {
  const { to, children, ...args } = props
  return (
    <Link href={to}>
      <a>
        <Button {...args}>{children}</Button>
      </a>
    </Link>
  )
}
