import { useEffect, useState } from "react"
import styled from "styled-components"

interface RadioTypeOptions {
  name: string
  value: any
}

type RadioProps = {
  name: string
  value?: any
  options: Array<RadioTypeOptions>
  onChange?: (value: string, name: string) => void
  bindTo?: React.Dispatch<React.SetStateAction<any>>
}

const RadioOption = styled.div`
  display: flex;
  cursor: pointer;
  user-select: none;
  align-items: center;
`

const RadioContainer = styled.div`
  display: flex;
  column-gap: 24px;
  margin: 8px 0;
`

const RadioBiggerPart = styled.div<{ selected: boolean }>`
  position: relative;
  height: 36px;
  width: 36px;
  border-radius: 9999px;
  transition: 500ms background-color, color;
  background-color: ${(props) => (props.selected ? "rgb(55 48 163)" : "white")};
  overflow: hidden;
`
const RadioBiggerInnerPart = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 999;
  width: 22px;
  height: 22px;
  transform: translate(-50%, -50%);
  border-radius: 9999px;
  border: 2px solid rgb(209 213 219);
  padding: 4px;
`
const Radio: React.FC<RadioProps> = (props) => {
  const { name, value, options, onChange, bindTo } = props
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (!value) setSelected(options[0].value)
  }, [options])

  useEffect(() => {
    if (value) {
      setSelected(value)
    }
    if (bindTo) bindTo((prevState) => ({ ...prevState, [name]: value }))
  }, [value])

  return (
    <RadioContainer>
      {options &&
        options.map((item: RadioTypeOptions) => (
          <RadioOption
            key={item.value}
            onClick={() => {
              setSelected(item.value)
              if (!bindTo) onChange(item.value, name)
              else bindTo((prevState) => ({ ...prevState, [name]: item.value }))
            }}>
            <RadioBiggerPart selected={selected === item.value}>
              <RadioBiggerInnerPart />
            </RadioBiggerPart>
            <div style={{marginLeft: "14px"}}>{item.name}</div>
          </RadioOption>
        ))}
    </RadioContainer>
  )
}
export default Radio
