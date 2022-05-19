import React, { SetStateAction } from "react"
import styled from "styled-components"
import Fillable from "./Fillable"
import { Input } from "./Input"
import { Grid } from "./Miscellaneous"
import { Select, SelectOptions } from "./Select"
const StyledSelect = styled(Select)`
  height: 40px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: 0;
  box-shadow: none;
`
const StyledInput = styled(Input)`
  width: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  height: 40px;
  box-shadow: none;
`
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
    <Grid column={3} row={1} style={{ height: "min-content" }}>
      <StyledSelect
        options={(!asyncData && options) || null}
        async={asyncData && true}
        onChange={(value) =>
          onSelectChange((prevState) => ({ ...prevState, [selectName]: value }))
        }
        asyncLoadUrl={asyncData && asyncData}
        title={selectTitle}
        optionText={selectOptionText}
        optionValue={selectOptionValue}
      />
      <Fillable colSpan={2}>
        <StyledInput
          value={textValue}
          onChange={(e) =>
            onTextChange((prevState) => ({
              ...prevState,
              [inputName]: e.target.value,
            }))
          }
          label={inputTitle}
        />
      </Fillable>
    </Grid>
  )
}

export default SelectInput
