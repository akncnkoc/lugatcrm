import React, { useEffect, useState } from "react"
import { SelectOptions } from "./Select"
import { Button } from "./Button"
import { DatatablePageSizeSelector } from "./datatable/DatatablePageSizeSelector"

export interface DatableOptions {
  pageSize: number
}

export interface DatatableDataShape {
  [name: string]: any
}

interface DatatableProps {
  columns: Array<string>
  options: DatableOptions
  data: DatatableDataShape[]
  render?: Function
}

export type DatatableState = {
  startPage: number
  endPage: number
  currentPage: number
  isFirstPage: boolean
  isLastPage: boolean
  totalDataCount: number
  loading: boolean
  notfound: boolean
  error: boolean
  pageSize: number
}
const INITIAL_PAGE_SIZE: number = 5
const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 25, 50, 100, 250, 500, 1000]

const preparePageSizeOptions = () => {
  return DEFAULT_PAGE_SIZE_OPTIONS.map((item, index) => {
    return { title: item, value: item } as SelectOptions
  })
}

export const Datatable: React.FC<DatatableProps> = (props) => {
  const { columns, options, data, render } = props

  const [pageItems, setPageItems] = useState<number[]>([])

  const [adapter, setAdapter] = useState({
    startPage: 1,
    endPage: 0,
    currentPage: 1,
    isFirstPage: true,
    isLastPage: false,
    totalDataCount: 0,
    loading: false,
    notfound: false,
    error: false,
    pageSize: 5,
  })
  const [innerData, setInnerData] = useState<DatatableDataShape[]>()

  const calculatePages = () => {
    let totalPages = Math.ceil(data.length / adapter.pageSize)
    if (totalPages <= adapter.pageSize) {
      setAdapter((prevState) => ({
        ...prevState,
        startPage: 1,
        endPage: totalPages,
      }))
    } else {
      let maxPagesBeforeCurrentPage = Math.floor(options.pageSize / 2)
      let maxPagesAfterCurrentPage = Math.ceil(options.pageSize / 2) - 1
      if (adapter.currentPage <= maxPagesBeforeCurrentPage) {
        setAdapter((prevState) => ({
          ...prevState,
          startPage: 1,
          endPage: adapter.pageSize,
        }))
      } else if (adapter.currentPage + maxPagesAfterCurrentPage >= totalPages) {
        setAdapter((prevState) => ({
          ...prevState,
          startPage: totalPages - adapter.pageSize + 1,
          endPage: totalPages,
        }))
      } else {
        setAdapter((prevState) => ({
          ...prevState,
          startPage: adapter.currentPage - maxPagesBeforeCurrentPage,
          endPage: adapter.currentPage + maxPagesAfterCurrentPage,
        }))
      }
    }
  }

  useEffect(() => {
    let pageNumbers = Array.from(
      Array(adapter.endPage + 1 - adapter.startPage).keys()
    ).map((item) => item)
    setPageItems(pageNumbers)
    calculatePages()
  }, [
    adapter.endPage,
    adapter.startPage,
    adapter.pageSize,
    adapter.currentPage,
  ])

  const updatePage = (page: number) => {
    if (page <= 1) {
      setAdapter((prevState) => ({
        ...prevState,
        currentPage: 1,
        isFirstPage: true,
        isLastPage: false,
      }))
    } else if (page >= Math.ceil(adapter.totalDataCount / adapter.pageSize)) {
      setAdapter((prevState) => ({
        ...prevState,
        currentPage: Math.ceil(adapter.totalDataCount / adapter.pageSize),
        isFirstPage: false,
        isLastPage: true,
      }))
    } else {
      setAdapter((prevState) => ({
        ...prevState,
        currentPage: page,
        isFirstPage: false,
        isLastPage: false,
      }))
    }
  }
  //TODO: someting wrong about page size and recalcuting buttons
  useEffect(() => {
    setAdapter((prevState) => ({
      ...prevState,
      loading: true,
      pageSize: options.pageSize
        ? DEFAULT_PAGE_SIZE_OPTIONS.findIndex((e) => options.pageSize === e) !=
          -1
          ? options.pageSize
          : INITIAL_PAGE_SIZE
        : INITIAL_PAGE_SIZE,
    }))
  }, [])

  useEffect(() => {
    setInnerData([])

    if (data && data.length >= 1) {
      let innerDataSliced = data.slice(
        (adapter.currentPage - 1) * adapter.pageSize,
        adapter.currentPage * adapter.pageSize
      )
      setInnerData(innerDataSliced)
      setAdapter((prevState) => ({
        ...prevState,
        totalDataCount: data.length,
        loading: false,
        notfound: false,
      }))
    } else if (data && data.length === 0) {
      setAdapter((prevState) => ({
        ...prevState,
        notfound: true,
        loading: false,
      }))
    }
    calculatePages()
  }, [
    data,
    adapter.currentPage,
    adapter.pageSize,
    adapter.isLastPage,
    adapter.isFirstPage,
  ])

  const prepareColumns = (tbody = true) => {
    return (
      <tr className={"overflow-hidden"}>
        {columns.map((title: string, index) => (
          <th
            className={` border-gray-200 px-6 py-3 text-[13px] font-medium font-medium leading-[20px] text-table-text-color
              ${tbody && index === 0 && "border-tl border-t border-b border-r"}
              ${
                tbody &&
                index === columns.length - 1 &&
                "rounded-tr border-r border-b"
              }
              ${!tbody && index === 0 && "rounded-bl border-b border-r"}
              ${!tbody && index === columns.length && "rounded-br border-r"}
              ${
                tbody &&
                index !== columns.length &&
                index !== 0 &&
                "border-t border-r border-b border-gray-200"
              }
              ${
                !tbody &&
                index !== columns.length &&
                index !== 0 &&
                "border-r border-b border-gray-200"
              }
            `}
            key={title}>
            {title}
          </th>
        ))}
      </tr>
    )
  }

  return (
    <div id="datatable" className={`flex h-full w-full flex-col p-4`}>
      <div id="table-header" className="flex justify-between">
        <DatatablePageSizeSelector
          adapter={adapter}
          setAdapter={setAdapter}
          pageSizes={preparePageSizeOptions()}
        />
      </div>
      <div className="flex flex-col">
        <div className="-my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="transition-shadow  sm:rounded-tr-lg sm:rounded-tl-lg">
              <table
                className="min-w-full border-separate divide-y divide-gray-200 overflow-hidden rounded-md border-l border-gray-200 text-center"
                style={{
                  borderSpacing: "0",
                }}>
                <thead>{prepareColumns()}</thead>
                <tbody className="bg-white ">
                  {adapter.loading && (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className={"border-l border-r border-gray-200 py-4"}>
                        Yükleniyor...
                      </td>
                    </tr>
                  )}
                  {adapter.notfound && (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className={"border-r border-b border-gray-200 py-4"}>
                        Herhangi bir veri bulunamadı.
                      </td>
                    </tr>
                  )}
                  {render &&
                    innerData &&
                    render({
                      innerData,
                    })}
                </tbody>
                <tfoot>{prepareColumns(false)}</tfoot>
              </table>
              <div className={"my-4 flex w-full justify-between"}>
                <div id={"show-results-count"}>
                  <span>{data.length} kayıt bulundu</span>
                </div>
                <div className="flex gap-x-2">
                  <Button
                    className={"bg-indigo-500 text-white hover:bg-indigo-600"}
                    disabled={adapter.isFirstPage}
                    onClick={() => {
                      updatePage(adapter.currentPage - 1)
                    }}>
                    Önceki
                  </Button>
                  {pageItems.map((i) => (
                    <Button
                      key={i + 1}
                      className={`text-sm ${
                        (i + 1 === adapter.currentPage && "bg-indigo-600") ||
                        "!bg-transparent text-[#7E8299]"
                      }`}
                      onClick={() => {
                        updatePage(i + 1)
                      }}>
                      {i + 1}
                    </Button>
                  ))}
                  <Button
                    className={"bg-indigo-500 text-white hover:bg-indigo-600"}
                    disabled={adapter.isLastPage}
                    onClick={() => {
                      updatePage(adapter.currentPage + 1)
                    }}>
                    Sonraki
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const TableDataCell = (props) => {
  return (
    <td className="font-[13px] whitespace-nowrap border-r border-b border-gray-200 border-gray-200 p-[13px] leading-[20px] text-[#3f4254]">
      {props.children}
    </td>
  )
}

export const TableRow = (props) => {
  return <tr>{props.children}</tr>
}
