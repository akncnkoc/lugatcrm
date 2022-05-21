import React, { Children, useEffect, useState } from "react"
import { Select, SelectOptions } from "./Select"
import { Button, PrimaryButton } from "./Button"
import styled from "styled-components"

export interface DatableOptions {
  pageSize?: number
}

export interface DatatableDataShape {
  [name: string]: any
}

interface DatatableProps {
  columns: Array<string>
  options?: DatableOptions
  data?: DatatableDataShape[]
  render?: Function
  asyncData?: string
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
  const { columns, options, data, render, asyncData } = props

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
  const [asyncItems, setAsyncItems] = useState<DatatableDataShape[]>([])

  const calculatePages = (itemLength: number = 0) => {
    let totalPages = data
      ? Math.floor(data.length / adapter.pageSize)
      : Math.floor(itemLength / adapter.pageSize)

    // if (totalPages <= adapter.pageSize) {
    //   setAdapter((prevState) => ({
    //     ...prevState,
    //     startPage: 0,
    //     endPage: totalPages,
    //   }))
    // } else {
    //   let maxPagesBeforeCurrentPage = Math.floor(adapter.pageSize / 2)
    //   let maxPagesAfterCurrentPage = Math.ceil(adapter.pageSize / 2) - 1
    //   if (adapter.currentPage <= maxPagesBeforeCurrentPage) {
    //     setAdapter((prevState) => ({
    //       ...prevState,
    //       startPage: 0,
    //       endPage: adapter.pageSize,
    //     }))
    //   } else if (adapter.currentPage + maxPagesAfterCurrentPage >= totalPages) {
    //     setAdapter((prevState) => ({
    //       ...prevState,
    //       startPage: totalPages - adapter.pageSize + 1,
    //       endPage: totalPages,
    //     }))
    //   } else {
    //     setAdapter((prevState) => ({
    //       ...prevState,
    //       startPage: adapter.currentPage - maxPagesBeforeCurrentPage,
    //       endPage: adapter.currentPage + maxPagesAfterCurrentPage,
    //     }))
    //   }
    // }
    let pageNumbers = Array.from(Array(totalPages).keys()).map((item) => item)
    setPageItems(pageNumbers)
  }

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
      pageSize:
        options && options.pageSize
          ? DEFAULT_PAGE_SIZE_OPTIONS.findIndex(
              (e) => options.pageSize === e
            ) != -1
            ? options.pageSize
            : INITIAL_PAGE_SIZE
          : INITIAL_PAGE_SIZE,
    }))
  }, [])

  useEffect(() => {
    setInnerData([])

    if (data && data.length >= 1 && !asyncData) {
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

  useEffect(() => {
    loadData()
  }, [asyncData])

  const prepareColumns = (tbody = true) => {
    return (
      <tr style={{ overflow: "hidden" }}>
        {columns.map((title: string, index) => (
          <DatatableColumnStyled
            columns={columns}
            tbody={tbody}
            key={title}
            index={index}>
            {title}
          </DatatableColumnStyled>
        ))}
      </tr>
    )
  }
  const loadData = async (page = 0, size = 5) => {
    if (asyncData) {
      setAdapter((prevState) => ({ ...prevState, loading: true }))
      fetch(asyncData + "?all=true")
        .then((res) => res.json())
        .then((res) => {
          if (res && res.length >= 1) {
            let innerDataSliced = res.slice(
              (adapter.currentPage - 1) * adapter.pageSize,
              adapter.currentPage * adapter.pageSize
            )
            setAsyncItems(innerDataSliced)
            setAdapter((prevState) => ({
              ...prevState,
              totalDataCount: res.length,
              loading: false,
              notfound: false,
            }))
          } else if (res && res.length === 0) {
            setAdapter((prevState) => ({
              ...prevState,
              notfound: true,
              loading: false,
            }))
          }
          calculatePages(res.length)
        })
        .catch((err) => {
          setAdapter((prevState) => ({
            ...prevState,
            loading: false,
            notfound: true,
          }))
        })
    }
  }
  const loadSlicedData = async (page = 0, size = 5) => {
    if (asyncData) {
      setAdapter((prevState) => ({ ...prevState, loading: true }))
      fetch(asyncData + "?page=" + page.toString() + "&size=" + size.toString())
        .then((res) => res.json())
        .then((res) => {
          if (res && res.length >= 1) {
            setAsyncItems(res)
            setAdapter((prevState) => ({
              ...prevState,
              loading: false,
              notfound: false,
              currentPage: page,
            }))
          } else if (res && res.length === 0) {
            setAdapter((prevState) => ({
              ...prevState,
              notfound: true,
              loading: false,
            }))
          }
        })
        .catch((err) => {
          setAdapter((prevState) => ({
            ...prevState,
            loading: false,
            notfound: true,
          }))
        })
    }
  }
  return (
    <DatatableContainer>
      <DatatableHeader>
        <DatatablePageSizeSelectorContainer>
          <span>Sayfada, </span>
          <div style={{ width: "128px" }}>
            <Select
              title=""
              name="pageSize"
              options={preparePageSizeOptions()}
              value={adapter.pageSize}
              onChange={(value) => {
                setAdapter((prevState) => ({ ...prevState, pageSize: value }))
              }}
            />
          </div>
          <span>kayıt gösteriliyor</span>
        </DatatablePageSizeSelectorContainer>
      </DatatableHeader>
      <DatatableTableContainer>
        <DatatableTableContainerDownOne>
          <DatatableTableContainerDownTwo>
            <DatatableTableContainerDownThree>
              <DatatableTable>
                <thead>{prepareColumns()}</thead>
                <tbody style={{ backgroundColor: "white" }}>
                  {adapter.loading && (
                    <tr>
                      <DatatableLoadingAndNotFound colSpan={columns.length}>
                        Yükleniyor...
                      </DatatableLoadingAndNotFound>
                    </tr>
                  )}
                  {adapter.notfound && (
                    <tr>
                      <DatatableLoadingAndNotFound colSpan={columns.length}>
                        Herhangi bir veri bulunamadı.
                      </DatatableLoadingAndNotFound>
                    </tr>
                  )}
                  {render &&
                    data &&
                    !asyncData &&
                    render({
                      innerData,
                    })}
                  {render &&
                    !data &&
                    asyncData &&
                    render({
                      asyncItems,
                      loadData,
                    })}
                </tbody>
                <tfoot>{prepareColumns(false)}</tfoot>
              </DatatableTable>
              <DatatableResultAndPaginationContainer>
                <div id={"show-results-count"}>
                  <span>{adapter.totalDataCount} kayıt bulundu</span>
                </div>
                <DatatablePaginationButtonContainer>
                  <PrimaryButton
                    disabled={adapter.currentPage == 0}
                    onClick={() => {
                      if (!asyncData) updatePage(adapter.currentPage - 1)
                      else loadSlicedData(adapter.currentPage - 1)
                    }}>
                    Önceki
                  </PrimaryButton>
                  {/* {pageItems.map((i) => (
                    <Button
                      key={i + 1}
                      className={`text-sm ${
                        (i + 1 === adapter.currentPage && "bg-indigo-600") ||
                        "!bg-transparent text-[#7E8299]"
                      }`}
                      onClick={() => {
                        if (!asyncData) updatePage(i)
                        else loadSlicedData(i)
                      }}>
                      {i + 1}
                    </Button>
                  ))} */}
                  <PrimaryButton
                    disabled={adapter.isLastPage}
                    onClick={() => {
                      if (!asyncData) updatePage(adapter.currentPage + 1)
                      else loadSlicedData(adapter.currentPage + 1)
                    }}>
                    Sonraki
                  </PrimaryButton>
                </DatatablePaginationButtonContainer>
              </DatatableResultAndPaginationContainer>
            </DatatableTableContainerDownThree>
          </DatatableTableContainerDownTwo>
        </DatatableTableContainerDownOne>
      </DatatableTableContainer>
    </DatatableContainer>
  )
}

const DatatableResultAndPaginationContainer = styled.div`
  margin-bottom: 16px;
  margin-top: 16px;
  display: flex;
  width: 100%;
  justify-content: space-between;
`
const DatatablePaginationButtonContainer = styled.div`
  display: flex;
  column-gap: 8px;
`
const DatatableContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  padding: 16px;
`
const DatatableHeader = styled.div`
  display: flex;
  justify-content: space-between;
`
const DatatableTableContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const DatatableTableContainerDownOne = styled.div`
  margin-top: -8px;
  margin-bottom: -8px;
  @media (min-width: 640px) {
    margin-left: -24px;
    margin-right: -24px;
  }
  @media (min-width: 1024px) {
    margin-left: -32px;
    margin-right: -32px;
  }
`
const DatatableTableContainerDownTwo = styled.div`
  display: inline-block;
  min-width: 100%;
  padding-top: 8px;
  padding-bottom: 8px;
  vertical-align: middle;

  @media (min-width: 640px) {
    padding-left: 24px;
    padding-right: 24px;
  }
  @media (min-width: 1024px) {
    padding-left: 32px;
    padding-right: 32px;
  }
`
const DatatableTableContainerDownThree = styled.div`
  @media (min-width: 640px) {
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
  }
`

const DatatableTable = styled.table`
  min-width: 100%;
  border-collapse: separate;
  /* & > * + * {
    border-top-width: 0px;
    border-bottom-width: 1px;
    border-color: #eeeeee;
  } */
  overflow: hidden;
  border-radius: 6px;
  border-left: 1px solid #eeeeee;
  text-align: center;
  border-spacing: 0;
`
const DatatableLoadingAndNotFound = styled.td`
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
  padding-bottom: 16px;
  padding-top: 16px;
`

const DatatablePageSizeSelectorContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  height: 32px;
  align-items: center;
  font-weight: 300;
  font-size: 13px;

  > * + * {
    margin-left: 16px;
  }
`
const TableDataCellStyled = styled.td<{
  center: boolean
  childrencount: number
}>`
  font-size: 13px;
  white-space: nowrap;
  border-right: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
  padding: 13px;
  line-height: 20px;
  color: #3f4254;
  display: ${(props) => (props.center ? "flex" : "")};
  justify-content: ${(props) => (props.center ? "center" : "start")};
  ${(props) => (props.childrencount >= 2 ? "> * + * {margin-left:8px}" : "")}
`

const DatatableColumnStyled = styled.th<{
  tbody: boolean
  index: number
  columns: Array<any>
}>`
  border-color: #eeeeee;
  padding: 12px 24px;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  color: #3f4254;
  ${(props) =>
    props.tbody &&
    props.index === 0 &&
    `
      border-top: 1px solid #eeeeee;
      border-bottom: 1px solid #eeeeee;
      border-right: 1px solid #eeeeee;
    `}
  ${(props) =>
    props.tbody &&
    props.index === props.columns.length - 1 &&
    `
      border-top-right-radius: 4px;
      border-right:1px solid #eeeeee;
      border-bottom: 1px solid #eeeeee;
    `}
  ${(props) =>
    !props.tbody &&
    props.index === 0 &&
    `
      border-bottom-left-radius: 4px;
      border-right: 1px solid #eeeeee;
      border-bottom: 1px solid #eeeeee;
    `}
  ${(props) =>
    !props.tbody &&
    props.index === props.columns.length &&
    `
      border-bottom-right-radius: 4px;
      border-right: 1px solid #eeeeee;
    `}
  ${(props) =>
    props.tbody &&
    props.index !== props.columns.length &&
    props.index !== 0 &&
    `
      border-top: 1px solid #eeeeee;
      border-right:1px solid #eeeeee;
      border-bottom: 1px solid #eeeeee;
    `}
  ${(props) =>
    !props.tbody &&
    props.index !== props.columns.length &&
    props.index !== 0 &&
    `
    border-right:1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    `}
`

export const TableDataCell = (props) => {
    return (
        <TableDataCellStyled
            center={props.center}
            childrencount={Children.count(props.children)}>
            {props.children}
        </TableDataCellStyled>
    )
}

export const TableRow = (props) => {
    return <tr>{props.children}</tr>
}
