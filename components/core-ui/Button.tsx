import React from "react"
import Link from "next/link"
import styled from "styled-components"
import { VscLoading } from "react-icons/vsc"

type ButtonProps = {
  hidden?: boolean
  icon?: string | React.ReactNode | React.ReactNode[]
  loading?: boolean
  children?: string | React.ReactNode | React.ReactNode[]
  onClick?: Function
  disabled?: boolean
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
    background-color: rgb(55 48 163);
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    pointer-events: none;
    opacity: 50%;
  }
  display: ${(props) => (props.icon ? "flex" : "block")};
  align-items: ${(props) => (props.icon ? "center" : "start")};
  visibility: ${(props) => props.hidden && "hidden"};
`

export const Button: React.FC<ButtonProps> = (props) => {
  const { loading, icon, hidden, children, onClick, disabled, ...args } = props
  return (
    <ButtonStyled
      icon={icon}
      hidden={hidden}
      onClick={(e) => onClick && onClick(e)}
      disabled={disabled}
      {...args}>
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
