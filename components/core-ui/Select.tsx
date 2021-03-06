import { BsQuestion } from "react-icons/bs"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { BiCheck, BiDownArrowAlt } from "react-icons/bi"
import { useOutsideAlerter } from "../../lib/outside-checker"
import { VscLoading } from "react-icons/vsc"
import styled, { css } from "styled-components"
import FadeIn from "./FadeIn"

export interface SelectOptions {
  title?: string | any
  value?: string | any
}

type SelectProps = {
  value?: string | number | any
  title: string
  name?: string
  onChange?: (e: string | number | any) => void
  handleBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void
  options?: Array<SelectOptions>
  error?: string
  loading?: boolean
  hint?: string
  withoutPick?: boolean
  optionText?: string
  optionValue?: string
  className?: string
  containerClassName?: string
  async?: boolean
  asyncLoadUrl?: string
  multiple?: boolean
  bindTo?: React.Dispatch<React.SetStateAction<any>>
}
const SelectContainer = styled.div`
  width: 100%;
`
const SelectUserSelectArea = styled.div<{
  opened: boolean
  multiple?: boolean
}>`
  position: relative;
  width: 100%;
  user-select: none;
  border-radius: 4px;
  border: 1px solid #e4e6ef;
  height: calc(1.5em + 1.3rem + 2px);
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${(props) => (props.opened ? "#3949ab" : "#616161")};

  //add focus thingi
  &:focus {
    outline: none;
    border-color: rgba(79 70 229 / 0.27);
  }
`
const SelectUserSelectDefaultText = styled.span`
  display: inline-block;
  padding: 0 16px;
`
const SelectUserAreaText = styled.span`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  font-size: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const SelectOptionsContainer = styled.div`
  position: absolute;
  z-index: 9999;
  margin-top: 4px;
  width: 100%;
  min-width: max-content;
  max-height: 240px;
  overflow: auto;
  border-radius: 8px;
  background-color: white;
  padding: 4px 0;
  border: 1px solid #eee;

  &:focus {
    outline: none;
  }
`
const SelectOptionItem = styled.div<{
  optionValue: string
  value: string
  multiple?: boolean
  checkFromValue?: Function
}>`
  position: relative;
  cursor: pointer;
  user-select: none;
  padding: 8px 16px 8px
    ${(props) =>
      (!props.multiple && props.optionValue == props.value) ||
      (props.multiple && props.checkFromValue(props.optionValue))
        ? "32px"
        : "16px"};
  //transition: 300ms background-color, color;
  // background-color: ${(props) =>
    props.optionValue === props.value ? "#95a6f7" : "white"};
  // color: ${(props) =>
    props.optionValue === props.value ? "#232fac" : "#212121"};
  transition: 500ms background-color;

  &:hover {
    background-color: #95a6f7;
    color: #232fac;
  }
`
const SelectOptionItemText = styled.span<{
  optionValue: string
  value: string
}>`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: ${(props) =>
    props.optionValue === props.value ? "500" : "400"};
`

const SelectOptionItemCheckedIcon = styled.span`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 0 8px;
  color: #3f51b5;
`
const SelectAsyncSelectedArea = styled.div<{ length: number }>`
  display: flex;
  align-items: center;
  height: 100%;

  > * + * {
    margin-left: 8px;
  }

  padding: ${(props) => (props.length === 0 ? "10px 0px" : "8px")};
`

const SelectAsyncSelectedItem = styled.span`
  border-radius: 4px;
  background-color: #e0e0e0;
  padding: 2px 6px;
  color: #616161;
`

const SelectTitleContainer = styled.div`
  display: flex;
  align-items: center;
`

const SelectTitleContent = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: #3f4254;
  display: inline-block;
  margin-bottom: 0.5rem;
`

const SelectHintContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
  border-radius: 9999px;
  border: 1px solid #9e9e9e;
`
const SelectHintContent = styled.div<{ hintShow: boolean }>`
  position: absolute;
  bottom: 100%;
  left: 50%;
  height: auto;
  width: 224px;
  border-radius: 8px;
  background-color: #3949ab;
  color: white;
  //transition: all;
  visibility: ${(props) => (!props.hintShow ? "hidden" : "visible")};
  transform: translate(
    ${(props) => (props.hintShow ? "0%" : "0%")},
    ${(props) => (props.hintShow ? "-50%" : "-8px")}
  );
`
const SelectMenuDownContainer = styled.div<{
  opened?: boolean
}>`
  transform: rotate(0deg);
  transition: all 0.2s ease-out;

  ${(props) =>
    props.opened &&
    css`
      transform: rotate(180deg);
    `};
`

const SelectTitle: React.FC<{ title?: string; hint?: string }> = (props) => {
  //? something wrong about usestate i cannot figure it out
  //TODO: update this piece of shit
  const { title, hint } = props
  const [hintVisible, setHintVisible] = useState<boolean>()
  return (
    title && (
      <SelectTitleContainer
        onMouseDown={() => {
          console.log("test")
          setHintVisible(true)
        }}>
        <SelectTitleContent>{title}</SelectTitleContent>
        {hint && (
          <SelectHintContainer>
            {hintVisible && (
              <FadeIn>
                <SelectHintContent hintShow={hintVisible}>
                  {hint}
                </SelectHintContent>
              </FadeIn>
            )}
            <BsQuestion size="15" color="gray" />
          </SelectHintContainer>
        )}
      </SelectTitleContainer>
    )
  )
}

export const Select: React.FC<SelectProps> = (props) => {
  const {
    value,
    title,
    onChange,
    options,
    multiple,
    name,
    hint,
    optionText = "title",
    optionValue = "value",
    className,
    containerClassName,
    async = false,
    asyncLoadUrl,
    bindTo = null,
  } = props
  const selectContainerRef = useRef<HTMLDivElement>(null)
  const [adapter, setAdapter] = useState<{
    opened: boolean
    value: string | string[] | any
    loading: boolean
    text: string | any
  }>({
    opened: false,
    value: "",
    loading: false,
    text: "",
  })

  const [asyncOptions, setAsyncOptions] = useState([])
  //If options length gt 0 and value not provided update value to options first value
  // If value and options provided and not async, select must be select given value option value
  useEffect(() => {
    if (options && options.length > 0 && (value || !async)) {
      setAdapter((prevState) => ({
        ...prevState,
        value: options[0][optionValue],
        text: options[0][optionText],
      }))
      onChange && onChange(options[0][optionValue])
    }
    if (value && options && options.length > 0 && !async) {
      const findValueIndex = options.findIndex((e) => {
        return e[optionValue] === value
      })
      if (findValueIndex === -1) return
      setAdapter((prevState) => ({
        ...prevState,
        value: options[findValueIndex][optionValue],
        text: options[findValueIndex][optionText],
      }))
    }
    if (value && asyncOptions && asyncOptions.length > 0) {
      const findValueIndex = asyncOptions.findIndex((e) => {
        return e[optionValue] == value
      })
      if (findValueIndex === -1) return
      setAdapter((prevState) => ({
        ...prevState,
        value: asyncOptions[findValueIndex][optionValue],
        text: asyncOptions[findValueIndex][optionText],
      }))
    }
  }, [value])

  // If contentend editable area focused or clicked open options menu
  useEffect(() => {
    const handleClick = () => {
      setAdapter((prevState) => ({
        ...prevState,
        opened: !adapter.opened,
      }))
    }
    selectContainerRef.current.addEventListener("click", handleClick)
  }, [selectContainerRef.current])

  useEffect(() => {
    if (async) {
      setAdapter((prevState) => ({ ...prevState, loading: true }))
      fetch(asyncLoadUrl)
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            let mappedOptions = res.map((item) => ({
              name: item[optionText],
              id: item[optionValue],
            }))
            setAsyncOptions(mappedOptions)
            setAdapter((prevState) => ({ ...prevState, loading: false }))
          }
        })
    }
  }, [])

  //TODO: when tpying in editable area must be updated items in value regex search
  const handleSearch = useCallback(() => {}, [])

  const findTitleFromValue = (value: any) => {
    let index = -1
    if (value) {
      if (!async)
        index = options.findIndex((item) => item[optionValue] === value)
      else
        index = asyncOptions.findIndex(
          (item) => item[optionValue] === String(value)
        )
    }
    return index != -1
      ? !async
        ? options[index][optionText]
        : asyncOptions[index][optionText]
      : null
  }
  const checkFromValue = (value: any) => {
    if (value) {
      if (Array.isArray(adapter.value)) {
        return adapter.value.findIndex((item) => item === String(value)) != -1
      }
    }
    return false
  }

  //If select focused open options menu
  const handleFocus = () => {
    if (!adapter.opened)
      setAdapter((prevState) => ({ ...prevState, opened: true }))
  }

  //If select unfocused close options menu
  const handleBlur = useCallback((e: FocusEvent) => {
    if (
      selectContainerRef.current &&
      !selectContainerRef.current.contains(e.target as any)
    )
      setAdapter((prevState) => ({ ...prevState, opened: !adapter.opened }))
  }, [])

  //Check if options menu opened and user click outside
  useOutsideAlerter(selectContainerRef, () => {
    setAdapter((prevState) => ({
      ...prevState,
      opened: false,
    }))
  })

  const SingleSelect = () => {
    return (
      <SelectContainer
        className={`${containerClassName}`}
        ref={selectContainerRef}>
        <SelectTitle title={title} hint={hint} />
        <div style={{ position: "relative", width: "100%", fontSize: "14px" }}>
          <SelectUserSelectArea
            opened={adapter.opened}
            className={`${className}`}
            onChange={handleSearch}
            onFocus={handleFocus}
            contentEditable
            suppressContentEditableWarning
            multiple={false}>
            <SelectUserAreaText>
              {(adapter.loading && (
                <VscLoading className={"animate-spin"} />
              )) || (
                //? look at transition for select element its buggy
                <SelectMenuDownContainer opened={adapter.opened}>
                  <BiDownArrowAlt />
                </SelectMenuDownContainer>
              )}
            </SelectUserAreaText>
            {(adapter.text && (
              <SelectUserSelectDefaultText>
                {adapter.text}
              </SelectUserSelectDefaultText>
            )) || (
              <SelectUserSelectDefaultText>Se??</SelectUserSelectDefaultText>
            )}
          </SelectUserSelectArea>
          {adapter.opened && (
            <SelectOptionsContainer>
              {(!async &&
                options &&
                options.length >= 1 &&
                showNotAsyncSingleSelectItems(
                  options,
                  optionValue,
                  optionText,
                  adapter,
                  onChange,
                  setAdapter,
                  checkFromValue,
                  bindTo,
                  name
                )) ||
                (!async && !options && (
                  <div
                    style={{
                      padding: "12px",
                    }}>
                    Herhangi bir {title.toLowerCase()} bulunamad??
                  </div>
                ))}
              {(async &&
                !options &&
                showAsyncSingleSelectItems(
                  asyncOptions,
                  optionValue,
                  onChange,
                  setAdapter,
                  adapter,
                  optionText,
                  bindTo,
                  name
                )) ||
                (async && (
                  <div
                    style={{
                      padding: "12px",
                    }}>
                    Herhangi bir {title.toLowerCase()} bulunamad??
                  </div>
                ))}
            </SelectOptionsContainer>
          )}
        </div>
      </SelectContainer>
    )
  }
  const MultipleSelect = () => {
    return (
      <SelectContainer
        className={`${containerClassName}`}
        ref={selectContainerRef}>
        <SelectTitle title={title} hint={hint} />
        <div style={{ position: "relative", width: "100%", fontSize: "14px" }}>
          <SelectUserSelectArea
            className={`${className}`}
            opened={adapter.opened}
            onChange={handleSearch}
            onFocus={handleFocus}
            onBlur={() => handleBlur}
            contentEditable
            suppressContentEditableWarning
            multiple={true}>
            <SelectUserAreaText>
              {(adapter.loading && (
                <VscLoading className={"animate-spin"} />
              )) || (
                //? look at transition for select element its buggy
                <div
                  style={{
                    transform: (adapter.opened && "rotate(180deg)") || "none",
                  }}>
                  <BiDownArrowAlt />
                </div>
              )}
            </SelectUserAreaText>
            {(Array.isArray(adapter.value) && (
              <SelectAsyncSelectedArea length={adapter.value.length}>
                {adapter.value.map((item, index) => (
                  <SelectAsyncSelectedItem
                    key={index}
                    className={"rounded bg-gray-300 px-1.5 py-1 text-gray-700"}>
                    {findTitleFromValue(item)}
                  </SelectAsyncSelectedItem>
                ))}
              </SelectAsyncSelectedArea>
            )) || (
              <SelectUserSelectDefaultText>Se??</SelectUserSelectDefaultText>
            )}
          </SelectUserSelectArea>
          {adapter.opened && (
            <SelectOptionsContainer>
              {(!async &&
                options &&
                options.length >= 1 &&
                options.map((item: SelectOptions, index) => (
                  <SelectOptionItem
                    key={index}
                    onClick={() => {
                      if (!checkFromValue(item[optionValue])) {
                        let appliedValue = [
                          ...item[optionValue],
                          ...(adapter.value as string[]),
                        ]
                        onChange(appliedValue)
                        // handleClose()
                        setAdapter((prevState) => ({
                          ...prevState,
                          value: appliedValue,
                        }))
                      }
                    }}
                    optionValue={item[optionValue]}
                    value={adapter.value}
                    multiple={true}
                    checkFromValue={checkFromValue}>
                    <SelectOptionItemText
                      optionValue={item[optionValue]}
                      value={adapter.value}>
                      {item[optionText]}
                    </SelectOptionItemText>
                    {item[optionValue] === adapter.value ? (
                      <SelectOptionItemCheckedIcon>
                        <BiCheck
                          aria-hidden="true"
                          style={{
                            width: "20px",
                            height: "20px",
                          }}
                        />
                      </SelectOptionItemCheckedIcon>
                    ) : null}
                  </SelectOptionItem>
                ))) ||
                (!async && (
                  <div style={{ padding: "12px" }}>
                    Herhangi bir {title.toLowerCase()} bulunamad??
                  </div>
                ))}

              {(async &&
                !options &&
                asyncOptions.map((item: SelectOptions, index) => (
                  <SelectOptionItem
                    optionValue={item[optionValue]}
                    value={adapter.value}
                    key={index}
                    onMouseDown={() => {
                      if (!checkFromValue(item[optionValue])) {
                        let appliedValue = [
                          item[optionValue],
                          ...(adapter.value as string[]),
                        ]
                        onChange(appliedValue)
                        // handleClose()
                        setAdapter((prevState) => ({
                          ...prevState,
                          value: appliedValue,
                        }))
                      } else {
                        let adapterArr = adapter.value as string[]
                        let filteredArr = adapterArr.filter(
                          (filteredArrItem) =>
                            filteredArrItem != item[optionValue]
                        )
                        onChange(filteredArr)
                        // handleClose()
                        setAdapter((prevState) => ({
                          ...prevState,
                          value: filteredArr,
                        }))
                      }
                    }}
                    multiple={true}
                    checkFromValue={checkFromValue}>
                    <SelectOptionItemText
                      optionValue={item[optionValue]}
                      value={adapter.value}>
                      {item[optionText]}
                    </SelectOptionItemText>
                    {checkFromValue(item[optionValue]) && (
                      <SelectOptionItemCheckedIcon>
                        <BiCheck
                          aria-hidden="true"
                          style={{
                            width: "20px",
                            height: "20px",
                          }}
                        />
                      </SelectOptionItemCheckedIcon>
                    )}
                  </SelectOptionItem>
                ))) ||
                (async && (
                  <div style={{ padding: "12px" }}>
                    Herhangi bir {title.toLowerCase()} bulunamad??
                  </div>
                ))}
            </SelectOptionsContainer>
          )}
        </div>
      </SelectContainer>
    )
  }

  return (!multiple && <SingleSelect />) || <MultipleSelect />
}

const showNotAsyncSingleSelectItems = (
  options,
  optionValue,
  optionText,
  adapter,
  onChange,
  setAdapter,
  checkFromValue,
  bindTo,
  name
) => {
  return options.map((item: SelectOptions, index) => (
    <SelectOptionItem
      optionValue={item[optionValue]}
      value={adapter.value}
      key={index}
      onMouseDown={() => {
        if (bindTo == null) {
          onChange(item[optionValue])
          setAdapter((prevState) => ({
            ...prevState,
            value: item[optionValue],
            text: item[optionText],
          }))
        } else {
          console.log(item[optionValue])
          setAdapter((prevState) => ({
            ...prevState,
            value: item[optionValue],
            text: item[optionText],
          }))
          bindTo((prevState) => ({ ...prevState, [name]: item[optionValue] }))
        }
      }}
      checkFromValue={checkFromValue}
      multiple={false}>
      <SelectOptionItemText
        optionValue={item[optionValue]}
        value={adapter.value}>
        {item[optionValue]}
      </SelectOptionItemText>
      {item[optionValue] === adapter.value ? (
        <SelectOptionItemCheckedIcon>
          <BiCheck
            aria-hidden="true"
            style={{
              width: "20px",
              height: "20px",
            }}
          />
        </SelectOptionItemCheckedIcon>
      ) : null}
    </SelectOptionItem>
  ))
}

const showAsyncSingleSelectItems = (
  asyncOptions,
  optionValue,
  onChange,
  setAdapter,
  adapter,
  optionText,
  bindTo,
  name
) => {
  return asyncOptions.map((item: SelectOptions, index) => (
    <SelectOptionItem
      optionValue={item[optionValue]}
      value={adapter.value}
      key={index}
      onMouseDown={() => {
        if (bindTo == null) {
          onChange(item[optionValue])

          setAdapter((prevState) => ({
            ...prevState,
            value: item[optionValue],
            text: item[optionText],
          }))
        } else {
          setAdapter((prevState) => ({
            ...prevState,
            value: item[optionValue],
            text: item[optionText],
          }))
          bindTo((prevState) => ({ ...prevState, [name]: item[optionValue] }))
        }
      }}
      multiple={false}>
      <SelectOptionItemText
        optionValue={item[optionValue]}
        value={adapter.value}>
        {item[optionText]}
      </SelectOptionItemText>
      {item[optionValue] === adapter.value ? (
        <SelectOptionItemCheckedIcon>
          <BiCheck
            aria-hidden="true"
            style={{
              width: "20px",
              height: "20px",
            }}
          />
        </SelectOptionItemCheckedIcon>
      ) : null}
    </SelectOptionItem>
  ))
}
