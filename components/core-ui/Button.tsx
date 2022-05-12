import React from "react"
import Link from "next/link"

type ButtonProps = {
  children?: string | JSX.Element | JSX.Element[] | undefined | any
  bgColor?: string
  className?: string
  disabled?: boolean
  hidden?: boolean
  ref?: string | undefined
  icon?: string | React.ReactNode | React.ReactNode[]
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    bgColor,
    className,
    disabled = false,
    hidden = false,
    ref,
    icon,
    ...args
  } = props

  const buttonRef = React.createRef<HTMLButtonElement>()
  return (
    <button
      ref={buttonRef}
      className={`relative rounded-lg bg-indigo-700 py-2.5 px-4 text-center text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800
      ${(bgColor && bgColor) || "bg-indigo-600"} text-white 
       ${disabled && "pointer-events-none disabled:opacity-50"}
       ${icon && "flex items-center"}
       ${hidden && "hidden"}
       ${className}
      `}
      disabled={disabled}
      {...args}>
      {icon && <span className={"block mr-1"}>{icon}</span>}
      {children}
    </button>
  )
}
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
