import { BsQuestion } from "react-icons/bs"
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { CheckIcon } from "@heroicons/react/solid"
import { Transition } from "@headlessui/react"
import { useOutsideAlerter } from "../../lib/outside-checker"
import { BiDownArrowAlt } from "react-icons/bi"
import { VscLoading } from "react-icons/vsc"
import styled from "styled-components"
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
}
const SelectContainer = styled.div`
  width: 100%;
`
const SelectUserSelectArea = styled.div<{ opened: boolean }>`
  position: relative;
  width: 100%;
  user-select: none;
  border-radius: 4px;
  border: 1px solid #eeeeee;
  padding: 8px 12px;
  font-size: 14px;
  color: ${(props) => (props.opened ? "#3949ab" : "#616161")};
  //add focus thingi
  &:focus {
    outline: none;
    border-color: rgba(79 70 229 / 0.27);
  }
`
const SelectUserAreaText = styled.span`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  font-size: 18px;
`

const SelectOptionsContainer = styled.div<{ opened: boolean }>`
  position: absolute;
  z-index: 50;
  margin-top: 4px;
  max-height: 60px;
  width: 100%;
  min-width: max-content;
  max-height: 240px;
  overflow: auto;
  border-radius: 8px;
  background-color: white;
  padding: 4px 0;
  font-size: 16px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.15), 0 1px 2px 0 rgb(0 0 0 / 0.15);
  visibility: ${(props) => (props.hidden ? "hidden" : "visible")};
  &:focus {
    outline: none;
  }
`
const SelectOptionItem = styled.div<{ optionValue: string; value: string }>`
  position: relative;
  cursor: pointer;
  user-select: none;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 32px;
  padding-right: 16px;
  transition: 300ms background-color, color;
  background-color: ${(props) =>
    props.optionValue === props.value ? "#95a6f7" : "white"};
  color: ${(props) =>
    props.optionValue === props.value ? "#232fac" : "#212121"};
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
  > * + * {
    margin-left: 8px;
  }
  padding: ${(props) => (props.length === 0 ? "10px 0px" : "0px")};
`

const SelectAsyncSelectedItem = styled.span`
  border-radius: 4px;
  background-color: #e0e0e0;
  padding: 6px 8px;
  color: #616161;
`


const SelectTitleContainer = styled.div`
  display: flex;
  align-items: center;
`

const SelectTitleContent = styled.div`
  margin-bottom: 8px;
  display: block;
  font-size: 14px;
  color: #616161;
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
  transition: all;
  visibility: ${(props) => (!props.hintShow ? "hidden" : "visible")};
  transform: translate(
    ${(props) => (props.hintShow ? "0%" : "0%")},
    ${(props) => (props.hintShow ? "-50%" : "-8px")}
  );
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
    hint,
    optionText = "title",
    optionValue = "value",
    className,
    containerClassName,
    async = false,
    asyncLoadUrl,
  } = props
  const selectContainerRef = useRef<HTMLDivElement>(null)
  const [adapter, setAdapter] = useState<{
    opened: boolean
    value: string | string[] | any
    loading: boolean
  }>({
    opened: false,
    value: "",
    loading: false,
  })

  const [asyncOptions, setAsyncOptions] = useState([])
  //If options length gt 0 and value not provided update value to options first value
  // If value and options provided and not async, select must be select given value option value
  useEffect(() => {
    if (options && options.length > 0 && !value) {
      setAdapter((prevState) => ({
        ...prevState,
        value: options[0][optionText],
      }))
      onChange && onChange(options[0][optionValue])
    }
    if (value && options && !async) {
      const findValueIndex = options.findIndex((e) => {
        return e[optionValue] === value
      })
      if (findValueIndex === -1) return
      setAdapter((prevState) => ({
        ...prevState,
        value: options[findValueIndex][optionText],
      }))
      onChange(options[findValueIndex][optionValue])
    }
  }, [options])

  //TODO: when tpying in editable area must be updated items in value regex search
  const handleSearch = useCallback(() => {}, [])
  
  const findTitleFromValue = (value: any) => {
    let index = -1
    if (value) {
      if (!async)
        index = options.findIndex((item) => item[optionValue] === String(value))
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
  const handleFocus = useCallback(() => {
    setAdapter((prevState) => ({ ...prevState, opened: true }))
  }, [])

  //If select unfocused close options menu
  const handleBlur = useCallback((e: FocusEvent) => {
    if (
      selectContainerRef.current &&
      !selectContainerRef.current.contains(e.target as any)
    )
      setAdapter((prevState) => ({ ...prevState, opened: false }))
  }, [])

  //Check if options menu opened and user click outside
  useOutsideAlerter(selectContainerRef, () => {
    setAdapter((prevState) => ({
      ...prevState,
      opened: false,
    }))
  })

  // If contentend editable area focused or clicked open options menu
  useEffect(() => {
    const handleClick = () => {
      setAdapter((prevState) => ({
        ...prevState,
        opened: true,
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
          let mappedOptions = res.map((item) => ({
            name: item[optionText],
            id: item[optionValue],
          }))
          setAsyncOptions(mappedOptions)
          setAdapter((prevState) => ({ ...prevState, loading: false }))
        })
    }
  }, [])

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
            onBlur={() => handleBlur}
            contentEditable
            suppressContentEditableWarning>
            <SelectUserAreaText>
              {(adapter.loading && (
                <VscLoading className={"animate-spin"} />
              )) || (
                //? look at transition for select element its buggy
                <div
                  style={{
                    transition: "1s all",
                    transform: (adapter.opened && "rotate(180deg)") || "none",
                  }}>
                  <BiDownArrowAlt />
                </div>
              )}
            </SelectUserAreaText>
            {findTitleFromValue(adapter.value) || "Seç"}
          </SelectUserSelectArea>
          {adapter.opened && (
            <FadeIn>
              <SelectOptionsContainer opened={adapter.opened}>
                {(!async &&
                  options &&
                  options.length >= 1 &&
                  options.map((item: SelectOptions, index) => (
                    <SelectOptionItem
                      optionValue={item[optionValue]}
                      value={adapter.value}
                      key={index}
                      onMouseDown={() => {
                        onChange(item[optionValue])
                        // handleClose()
                        setAdapter((prevState) => ({
                          ...prevState,
                          value: item[optionValue],
                        }))
                      }}>
                      <SelectOptionItemText
                        optionValue={item[optionValue]}
                        value={adapter.value}>
                        {item[optionValue]}
                      </SelectOptionItemText>
                      {item[optionValue] === adapter.value ? (
                        <SelectOptionItemCheckedIcon>
                          <CheckIcon
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
                    <div
                      style={{
                        padding: "12px",
                      }}>
                      Herhangi bir {title.toLowerCase()} bulunamadı
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
                        onChange(item[optionValue])
                        setAdapter((prevState) => ({
                          ...prevState,
                          value: item[optionValue],
                        }))
                      }}>
                      <SelectOptionItemText
                        optionValue={item[optionValue]}
                        value={adapter.value}>
                        {item[optionText]}
                      </SelectOptionItemText>
                      {item[optionValue] === adapter.value ? (
                        <SelectOptionItemCheckedIcon>
                          <CheckIcon
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
                  (async && (
                    <div
                      style={{
                        padding: "12px",
                      }}>
                      Herhangi bir {title.toLowerCase()} bulunamadı
                    </div>
                  ))}
              </SelectOptionsContainer>
            </FadeIn>
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
            suppressContentEditableWarning>
            <SelectUserAreaText>
              {(adapter.loading && (
                <VscLoading className={"animate-spin"} />
              )) || (
                //? look at transition for select element its buggy
                <div
                  style={{
                    transition: "1s all",
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
            )) ||
              "Seç"}
          </SelectUserSelectArea>
          {adapter.opened && (
            <FadeIn>
              <SelectOptionsContainer opened={adapter.opened}>
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
                      value={adapter.value}>
                      <SelectOptionItemText
                        optionValue={item[optionValue]}
                        value={adapter.value}>
                        {item[optionText]}
                      </SelectOptionItemText>
                      {item[optionValue] === adapter.value ? (
                        <SelectOptionItemCheckedIcon>
                          <CheckIcon
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
                      Herhangi bir {title.toLowerCase()} bulunamadı
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
                      }}>
                      <>
                        <SelectOptionItemText
                          optionValue={item[optionValue]}
                          value={adapter.value}>
                          {item[optionText]}
                        </SelectOptionItemText>
                        {checkFromValue(item[optionValue]) && (
                          <SelectOptionItemCheckedIcon>
                            <CheckIcon
                              aria-hidden="true"
                              style={{
                                width: "20px",
                                height: "20px",
                              }}
                            />
                          </SelectOptionItemCheckedIcon>
                        )}
                      </>
                    </SelectOptionItem>
                  ))) ||
                  (async && (
                    <div style={{ padding: "12px" }}>
                      Herhangi bir {title.toLowerCase()} bulunamadı
                    </div>
                  ))}
              </SelectOptionsContainer>
            </FadeIn>
          )}
        </div>
      </SelectContainer>
    )
  }

  return (!multiple && <SingleSelect />) || <MultipleSelect />
}
