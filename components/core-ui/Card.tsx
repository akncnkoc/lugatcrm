import React from "react"

type CardProps = {
  fullWidth?: boolean
  bgColor?: string
  shadow?: boolean
  children?: string | JSX.Element | JSX.Element[] | undefined
}
const Card: React.FC<CardProps> = (props) => {
  const { fullWidth = true, bgColor, shadow = true } = props
  return (
    <div
      className={`
        h-full
        rounded
        ${fullWidth && "w-full"} 
        ${(bgColor && bgColor) || "bg-white"} 
        ${shadow && "shadow shadow-aside-filler/20"}        
      `}>
      {props.children}
    </div>
  )
}

export const CardHeader: React.FC<{
  children?: JSX.Element[] | JSX.Element | string | undefined
  hasAction?: boolean
}> = (props) => {
  const { children, hasAction = false } = props
  return (
    <div
      className={`flex h-16 w-full items-center border-b border-gray-filler py-4 px-4 ${
        hasAction && "justify-between"
      }`}>
      {children}
    </div>
  )
}
export const CardContent = (props) => {
  return <div className="h-max w-full py-4">{props.children}</div>
}
export const CardTitle = (props) => {
  return <h1 className="font-medium">{props.children}</h1>
}

export const CardActions = (props) => {
  return <div className="flex space-x-2">{props.children}</div>
}

export const CardFooter: React.FC<
  {
    children?: JSX.Element[] | JSX.Element | string | undefined
    hasAction?: boolean
    className?: string
  } & React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
> = (props) => {
  const { children, className, ...args } = props
  return (
    <div
      className={`flex h-16 w-full items-center justify-end ${className}`}
      {...args}>
      {children}
    </div>
  )
}
export default Card
