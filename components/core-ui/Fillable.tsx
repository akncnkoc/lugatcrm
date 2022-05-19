import styled from "styled-components"

type FillableProps = {
  rowSpan?: number
  colSpan?: number
}

const Fillable = styled.div<FillableProps>`
  grid-row: span ${(props) => props.rowSpan};
  grid-column: span ${(props) => props.colSpan};
`

export default Fillable
