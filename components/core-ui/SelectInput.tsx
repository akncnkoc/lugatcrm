import React, { SetStateAction } from "react"
import { Select, SelectOptions } from "./Select"
import { Input } from "./Input"
import { Grid } from "./Miscellaneous"
import Fillable from "./Fillable"

const SelectInput: React.FC<{
  selectedValue?: string | number | any | undefined
  textValue?: string | number | any | undefined
  onSelectChange?: React.Dispatch<SetStateAction<any>>
  onTextChange?: React.Dispatch<SetStateAction<any>>
  options?: SelectOptions[]
  asyncData?: string
  selectTitle: string
  inputTitle: string
  selectOptionText: string
  selectOptionValue: string
  inputName: string
  selectName: string
}> = (props) => {
  const {
    selectedValue,
    options,
    onSelectChange,
    onTextChange,
    asyncData,
    textValue,
    selectTitle,
    inputTitle,
    selectOptionText,
    selectOptionValue,
    inputName,
    selectName,
    ...args
  } = props
  return (
    <Grid col={3} row={1} className={"h-min"}>
      <Select
        options={!asyncData && options || null}
        async={asyncData && true}
        onChange={(value) =>
          onSelectChange((prevState) => ({ ...prevState, [selectName]: value }))
        }
        asyncLoadUrl={asyncData && asyncData}
        title={selectTitle}
        optionText={selectOptionText}
        optionValue={selectOptionValue}
        className={
          "h-10 rounded-tr-none rounded-br-none border-r-0 shadow-none focus:border-gray-200 focus:ring-0"
        }
      />
      <Fillable colSpan={2}>
        <Input
          value={textValue}
          onChange={(e) =>
            onTextChange((prevState) => ({
              ...prevState,
              [inputName]: e.target.value,
            }))
          }
          label={inputTitle}
          inputClassName={
            "w-full rounded-tl-none rounded-bl-none h-10 shadow-none"
          }
        />
      </Fillable>
    </Grid>
  )
}

export default SelectInput
