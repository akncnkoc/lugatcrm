import { useEffect, useState } from "react"

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

const Radio: React.FC<RadioProps> = (props) => {
  const { name, value, options, onChange, bindTo } = props
  const [selected, setSelected] = useState<string>("")

  useEffect(() => {
    if(!value) setSelected(options[0].value)
  }, [options])

  useEffect(() => {
    if (value) {
      setSelected(value)
    }
    if(bindTo) bindTo((prevState) => ({ ...prevState, [name]: value }))
  }, [value])

  return (
    <div className="flex gap-x-6">
      {options &&
        options.map((item: RadioTypeOptions) => (
          <div
            key={item.value}
            className="flex cursor-pointer select-none items-center"
            onClick={() => {
              setSelected(item.value)
              if (!bindTo) onChange(item.value, name)
              else bindTo((prevState) => ({ ...prevState, [name]: item.value }))
            }}>
            <div
              className={`relative h-6 w-6 items-center justify-center overflow-visible  rounded-full shadow-md shadow-gray-500 transition-colors ${
                (selected === item.value && "bg-indigo-600") || "bg-white"
              }`}>
              <div
                className={`absolute top-1/2 left-1/2 z-999 h-7 w-7 -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-gray-300 p-4 shadow-md shadow-gray-500 transition-colors`}
              />
            </div>
            <div className="ml-4">{item.name}</div>
          </div>
        ))}
    </div>
  )
}
export default Radio
