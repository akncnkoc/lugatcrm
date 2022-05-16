import { useEffect, useState } from "react"
import { BiCheck } from "react-icons/bi"

type CheckBoxProps = {
  children?: React.ReactNode[] | React.ReactNode | string
  onChange?: (value: boolean) => void
  value?: boolean
}
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
    <div
      className="flex min-w-full cursor-pointer select-none items-center"
      onClick={() => {
        setSelected(!selected)
        onChange && onChange(!selected)
      }}>
      <div
        className={`relative flex h-6 w-14 rounded-full border ${
          (!selected && "border-gray-300 bg-gray-300") || "border-indigo-500 bg-indigo-500"
        }`}>
        <div
          className={`absolute top-1/2 h-8 w-8 -translate-y-1/2 transform rounded-full transition-transform ${
            !selected
              ? "translate-x-0 bg-gray-400"
              : "translate-x-7 bg-indigo-700"
          }`}>
          <div
            className={`flex h-full w-full items-center justify-center text-white ${selected && "opacity-100" || "opacity-0"} transition-opacity`}>
            <BiCheck size="18" />
          </div>
        </div>
      </div>
      <div className="ml-5 select-none font-medium">{children}</div>
    </div>
  )
}

export default CheckBox
