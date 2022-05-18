import { useEffect, useState } from "react"
import { BiCheck } from "react-icons/bi"
import styled from "styled-components"

type CheckBoxProps = {
  children?: React.ReactNode[] | React.ReactNode | string
  onChange?: (value: boolean) => void
  value?: boolean
}

const CheckboxContainer = styled.div`
  display: flex;
  min-width: 100%;
  cursor: pointer;
  user-select: none;
  align-items: center;
`

const CheckboxTrack = styled.div<{ selected: boolean }>`
  position: relative;
  display: flex;
  height: 20px;
  width: 44px;
  border-radius: 9999px;
  border: 1px solid ${(props) => (props.selected ? "#3949ab" : "#e0e0e0")};
  background-color: ${(props) => (props.selected ? "#3949ab" : "#e0e0e0")};
`

const CheckboxTrackCircle = styled.div<{ selected: boolean }>`
  position: absolute;
  top: 50%;
  height: 24px;
  width: 24px;
  transition: 300ms transform, background-color;
  transform: translate(${(props) => (props.selected ? "20px" : "0")},-50%);
  border-radius: 9999px;
  background-color: ${(props) => (!props.selected ? "#bdbdbd" : "#1a237e")};
`

const CheckboxTrackCircleIcon = styled.div<{ selected: boolean }>`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: white;
  transition: 300ms opacity;
  opacity: ${(props) => (props.selected ? "100" : "0")};
`

const CheckboxChildrenContainer = styled.div`
  margin-left: 20px;
  user-select: none;
  font-weight: 500;
`

const CheckBox: React.FC<CheckBoxProps> = (props) => {
  const { children, onChange, value } = props
  const [selected, setSelected] = useState<boolean>(false)
  useEffect(() => {
    if (value === true) {
      setSelected(true)
      onChange && onChange(true)
    }
  }, [value])
  return (
    <CheckboxContainer
      onClick={() => {
        setSelected(!selected)
        onChange && onChange(!selected)
      }}>
      <CheckboxTrack selected={selected}>
        <CheckboxTrackCircle selected={selected}>
          <CheckboxTrackCircleIcon selected={selected}>
            <BiCheck size="18" />
          </CheckboxTrackCircleIcon>
        </CheckboxTrackCircle>
      </CheckboxTrack>
      <CheckboxChildrenContainer>{children}</CheckboxChildrenContainer>
    </CheckboxContainer>
  )
}

export default CheckBox
