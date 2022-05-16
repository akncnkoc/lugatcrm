import styled from 'styled-components'

type GridProps = {
  row?: number,
  column?: number
} & React.HtmlHTMLAttributes<HTMLDivElement>

export const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-rows: repeat(${(props) => props.row}, minmax(0,1fr));
  grid-template-columns: repeat(${(props) => props.column}, minmax(0,1fr));
`;