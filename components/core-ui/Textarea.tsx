import React from "react"
import styled from "styled-components"
import { InputProps } from "./Input"

const TextareaContainer = styled.div`
  margin: "16px 0";
`

const TextareLabel = styled.label`
  margin: "8px 0";
  display: block;
  font-size: 14px;
  color: rgb(55 65 81);
`

type TextareaType = {} & InputProps & React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>,HTMLTextAreaElement>


//? What is the problem idk. just solve with <any> keyword
//TODO  change here if its possible with all textarea props
const TextareStyled = styled.textarea<any>`
  margin-top: 4px;
  display: block;
  width: 100%;
  border-radius: 6px;
  border: 1px solid rgb(229 231 235);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05), 0 1px 2px 0 rgb(0 0 0 / 0.05);
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  padding: 8px 12px;
  outline: none;
  min-height: 300px;
  appearance: none;
  &:focus {
    box-shadow: 0 0 0 2px rgba(79 70 229 / 0.27);
    border-color: rgba(79 70 229 / 0.27);
  }
`

export const Textarea: React.FC<TextareaType> = (props) => {
  const {
    name,
    label,
    value,
    labelClassName,
    inputClassName,
    hideLabel = false,
    bindTo,
    onChange,
    suffix,
    ...args
  } = props
  return (
    <TextareaContainer>
      {!hideLabel && (
        <TextareLabel className={`${labelClassName}`} htmlFor={name}>
          {label}
        </TextareLabel>
      )}
      <div style={{ position: "relative" }}>
        <TextareStyled
          className={`${inputClassName}`}
          id={name}
          defaultValue={value}
          onChange={(e) => onChange && onChange(e)}
          {...args}
        />
        {suffix && suffix}
      </div>
    </TextareaContainer>
  )
}
