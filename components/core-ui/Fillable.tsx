const Fillable: React.FC<{
  children?: React.ReactNode
  rowSpan?: number
  colSpan?: number
  flex?: number
}> = (props) => {
  const { rowSpan, colSpan, children, flex } = props
  return (
    <div
      style={{
        gridRow: "span " + rowSpan,
        gridColumn: "span " + colSpan,
      }}>
      {children}
    </div>
  )
}

export default Fillable
