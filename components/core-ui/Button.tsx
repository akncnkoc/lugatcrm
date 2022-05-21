import React from "react"
import Link from "next/link"
import styled from "styled-components"
import { VscLoading } from "react-icons/vsc"
import { cssVar, darken, lighten } from "polished"

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
  cursor: pointer;
  color: #fff;
  outline: none;
  vertical-align: middle;
  font-weight: 600;
  text-align: center;
  user-select: none;
  padding: 8.45px 13px;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 5.46px;
  box-shadow: none;
  transition: color 0.15s ease, background-color 0.15s ease,
    border-color 0.15s ease, box-shadow 0.15s ease,
    -webkit-box-shadow 0.15s ease;
  display: ${(props) => (props.icon ? "flex" : "inline-block")};
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

export const PrimaryButton = styled(Button)`
  background-color: var(--primary);
  border: 1px solid var(--primary);

  &:hover {
    background-color: #187de4;
    border-color: #187de4;
  }
`
export const SecondaryButton = styled(Button)`
  background-color: var(--secondary);
  border: 1px solid var(--secondary);

  &:hover {
    background-color: darken(var(--secondary), 50%);
    border-color: #187de4;
  }
`

export const SuccessButton = styled(Button)`
  background-color: var(--success);
  border: 1px solid var(--success);

  &:hover {
    // background-color: ${darken(0.5, cssVar("--success") as string)};
    //border-color: #187de4;
  }
`
export const IconButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  height: calc(1.5em + 1.5rem + 2px);
  width: calc(1.5em + 1.5rem + 2px);
`

export const LinkButton: React.FC<{ to: string } & ButtonProps> = (props) => {
  const { to, children, ...args } = props
  return (
    <Link href={to}>
      <a>
        <PrimaryButton {...args}>{children}</PrimaryButton>
      </a>
    </Link>
  )
}
