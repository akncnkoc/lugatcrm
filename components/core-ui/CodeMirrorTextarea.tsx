import React, { useEffect, useRef } from "react"
import { InputProps } from "./Input"

import "codemirror/lib/codemirror.css"
import "codemirror/theme/dracula.css"

type CodeMirrorProps = {
  mode?: string | object
  tabSize?: number
  lineNumbers?: boolean
}

export const CodeMirrorTextarea: React.FC<
  InputProps<HTMLTextAreaElement> &
    React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    > &
    CodeMirrorProps
> = (props) => {
  const {
    name,
    label,
    value,
    labelClassName,
    inputClassName,
    hideLabel = false,
    onChange,
    mode,
    suffix,
    ...args
  } = props

  const textareaRef = useRef(null)

  useEffect(() => {
    if (textareaRef.current) {
      let CodeMirror = null
      if (
        typeof window !== "undefined" &&
        typeof window.navigator !== "undefined"
      ) {
        CodeMirror = require("codemirror")
        require("codemirror/mode/javascript/javascript")
        require("codemirror/addon/edit/closebrackets")

        let mirrortextarea = CodeMirror.fromTextArea(textareaRef.current, {
          mode: mode,
          lineNumbers: true,
          theme: "dracula",
          autoCloseBrackets: true,
        })
        mirrortextarea.on("blur", (instance, changeObj) => {
          console.log(changeObj)
        })
      }
    }
  }, [textareaRef.current])

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
          ref={textareaRef}
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
