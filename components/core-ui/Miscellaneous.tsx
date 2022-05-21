import styled from "styled-components"

type GridProps = {
  row?: number
  column?: number
  columnGap?: number
  rowGap?: number
} & React.HtmlHTMLAttributes<HTMLDivElement>

export const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-rows: repeat(${(props) => props.row}, minmax(0, 1fr));
  grid-template-columns: repeat(${(props) => props.column}, minmax(0, 1fr));
  grid-column-gap: ${(props) => (props.columnGap ? props.columnGap + "px" : "0")};
  grid-row-gap: ${(props) => (props.rowGap ? props.rowGap + "px" : "0")};
`