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
  useEffect(() => {
    if (options && options.length > 0 && !value) {
      setAdapter((prevState) => ({
        ...prevState,
        value: options[0][optionText],
      }))
      onChange(options[0][optionValue])
    }
  }, [options])

  //TODO: when tpying in editable area must be updated items in value regex search
  const handleSearch = useCallback(() => {}, [])
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
  // If value and options provided and not async, select must be select given value option value
  useEffect(() => {
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

  const findTitleFromValue = (value) => {
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
  const checkFromValue = (value) => {
    if (value) {
      if (Array.isArray(adapter.value)) {
        return adapter.value.findIndex((item) => item === String(value)) != -1
      }
    }
    return false
  }

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
      <div className={`w-full ${containerClassName}`} ref={selectContainerRef}>
        <SelectTitle title={title} hint={hint} />
        <div className={"relative w-full text-sm"}>
          <div
            className={`relative w-full select-none rounded border border-gray-200 px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-indigo-300 focus:outline-none  focus:ring-indigo-200 focus:ring-opacity-50  ${
              adapter.opened && "border-indigo-300"
            } ${className}`}
            onChange={handleSearch}
            onFocus={handleFocus}
            onBlur={() => handleBlur}
            contentEditable
            suppressContentEditableWarning>
            <span
              className={
                "absolute right-2 top-1/2 -translate-y-1/2 transform text-lg"
              }>
              {(adapter.loading && (
                <VscLoading className={"animate-spin"} />
              )) || (
                <BiDownArrowAlt
                  className={`transform transition-transform duration-300 ${
                    adapter.opened && "rotate-180"
                  }`}
                />
              )}
            </span>
            {findTitleFromValue(adapter.value) || "Seç"}
          </div>
          <Transition
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform opacity-0"
            enterTo="transform opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform opacity-100"
            leaveTo="transform opacity-0"
            show={adapter.opened}>
            <div
              className={`${
                !adapter.opened && "hidden"
              } scrollbar absolute z-50 mt-1 max-h-60 w-full min-w-max overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}>
              {(!async &&
                options &&
                options.length >= 1 &&
                options.map((item: SelectOptions, index) => (
                  <div
                    key={index}
                    onMouseDown={() => {
                      onChange(item[optionValue])
                      // handleClose()
                      setAdapter((prevState) => ({
                        ...prevState,
                        value: item[optionValue],
                      }))
                    }}
                    className={`relative  cursor-pointer select-none py-2 pl-8 pr-4 hover:bg-indigo-100 hover:text-indigo-900 ${
                      item[optionText] === adapter.value
                        ? "bg-indigo-100 text-indigo-900"
                        : "text-gray-900"
                    }`}>
                    <>
                      <span
                        className={`block truncate ${
                          item[optionText] === adapter.value
                            ? "font-medium"
                            : "font-normal"
                        }`}>
                        {item[optionText]}
                      </span>
                      {item[optionText] === adapter.value ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  </div>
                ))) ||
                (!async && (
                  <div className={"p-3"}>
                    Herhangi bir {title.toLowerCase()} bulunamadı
                  </div>
                ))}
              {(async &&
                !options &&
                asyncOptions.map((item: SelectOptions, index) => (
                  <div
                    key={index}
                    onMouseDown={() => {
                      onChange(item[optionValue])
                      setAdapter((prevState) => ({
                        ...prevState,
                        value: item[optionValue],
                      }))
                    }}
                    className={`relative cursor-pointer select-none py-2 pl-8 pr-4 hover:bg-indigo-100 hover:text-indigo-900 ${
                      item[optionText] === adapter.value
                        ? "bg-indigo-100 text-indigo-900"
                        : "text-gray-900"
                    }`}>
                    <>
                      <span
                        className={`block truncate ${
                          item[optionText] === adapter.value
                            ? "font-medium"
                            : "font-normal"
                        }`}>
                        {item[optionText]}
                      </span>
                      {item[optionText] === adapter.value ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  </div>
                ))) ||
                (async && (
                  <div className={"p-3"}>
                    Herhangi bir {title.toLowerCase()} bulunamadı
                  </div>
                ))}
            </div>
          </Transition>
        </div>
      </div>
    )
  }
  const MultipleSelect = () => {
    return (
      <div className={`w-full ${containerClassName}`} ref={selectContainerRef}>
        <SelectTitle title={title} hint={hint} />
        <div className={"relative w-full text-sm"}>
          <div
            className={`relative w-full select-none rounded border border-gray-200 px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-indigo-300 focus:outline-none  focus:ring-indigo-200 focus:ring-opacity-50  ${
              adapter.opened && "border-indigo-300"
            } ${className}`}
            onChange={handleSearch}
            onFocus={handleFocus}
            onBlur={() => handleBlur}
            contentEditable
            suppressContentEditableWarning>
            <span
              className={
                "absolute right-2 top-1/2 -translate-y-1/2 transform text-lg"
              }>
              {(adapter.loading && (
                <VscLoading className={"animate-spin"} />
              )) || (
                <BiDownArrowAlt
                  className={`transform transition-transform duration-300 ${
                    adapter.opened && "rotate-180"
                  }`}
                />
              )}
            </span>
            {(Array.isArray(adapter.value) && (
              <div
                className={`flex space-x-2 ${
                  adapter.value.length === 0 && "py-2.5"
                }`}>
                {adapter.value.map((item, index) => (
                  <span
                    key={index}
                    className={"rounded bg-gray-300 px-1.5 py-1 text-gray-700"}>
                    {findTitleFromValue(item)}
                  </span>
                ))}
              </div>
            )) ||
              "Seç"}
          </div>
          <Transition
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform opacity-0"
            enterTo="transform opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform opacity-100"
            leaveTo="transform opacity-0"
            show={adapter.opened}>
            <div
              className={`${
                !adapter.opened && "hidden"
              } scrollbar absolute z-50 mt-1 max-h-60 w-full min-w-max overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}>
              {(!async &&
                options &&
                options.length >= 1 &&
                options.map((item: SelectOptions, index) => (
                  <div
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
                    className={`relative  cursor-pointer select-none py-2 pl-8 pr-4 hover:bg-indigo-100 hover:text-indigo-900 ${
                      item[optionText] === adapter.value
                        ? "bg-indigo-100 text-indigo-900"
                        : "text-gray-900"
                    }`}>
                    <>
                      <span
                        className={`block truncate ${
                          item[optionText] === adapter.value
                            ? "font-medium"
                            : "font-normal"
                        }`}>
                        {item[optionText]}
                      </span>
                      {item[optionText] === adapter.value ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  </div>
                ))) ||
                (!async && (
                  <div className={"p-3"}>
                    Herhangi bir {title.toLowerCase()} bulunamadı
                  </div>
                ))}
              {(async &&
                !options &&
                asyncOptions.map((item: SelectOptions, index) => (
                  <div
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
                    className={`relative cursor-pointer select-none py-2 pl-8 pr-4 hover:bg-indigo-100 hover:text-indigo-900 ${
                      item[optionText] === adapter.value
                        ? "bg-indigo-100 text-indigo-900"
                        : "text-gray-900"
                    }`}>
                    <>
                      <span
                        className={`block truncate ${
                          item[optionValue] === adapter.value
                            ? "font-medium"
                            : "font-normal"
                        }`}>
                        {item[optionText]}
                      </span>
                      {checkFromValue(item[optionValue]) && (
                        <span
                          key={index}
                          className="absolute inset-y-0 left-0 flex items-center pl-2 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  </div>
                ))) ||
                (async && (
                  <div className={"p-3"}>
                    Herhangi bir {title.toLowerCase()} bulunamadı
                  </div>
                ))}
            </div>
          </Transition>
        </div>
      </div>
    )
  }

  return (!multiple && <SingleSelect />) || <MultipleSelect />
}
const SelectTitle: React.FC<{ title?: string; hint?: string }> = (props) => {
  const { title, hint } = props
  const [hintShow, setHintShow] = useState(false)
  return (
    title && (
      <div className={"flex items-center"}>
        <div className={"mb-2 block text-sm text-gray-700"}>{title}</div>
        {hint && (
          <div
            className="relative inline-block cursor-pointer rounded-full border border-gray-500"
            onClick={() => setHintShow(!hintShow)}>
            <div
              className={`absolute bottom-full left-1/2 h-auto w-56 transform rounded-lg bg-black  p-2 text-center text-white transition-all ${
                !hintShow
                  ? "hidden translate-x-0 translate-y-0"
                  : "-translate-x-1/2 -translate-y-2"
              }`}>
              {hint}
            </div>
            <BsQuestion size="15" color="gray" />
          </div>
        )}
      </div>
    )
  )
}
