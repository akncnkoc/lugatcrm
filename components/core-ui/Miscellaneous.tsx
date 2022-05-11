export const Grid: React.FC<
  {
    row?: number
    col?: number
    className?: string
  } & React.HtmlHTMLAttributes<HTMLDivElement>
> = (props) => {
  const { row = 1, col = 1, className, ...args } = props
  return (
    <div
      className={`grid ${className}`}
      style={{
        gridTemplateRows: `repeat(${row}, minmax(0, 1fr))`,
        gridTemplateColumns: `repeat(${col}, minmax(0, 1fr))`,
      }}
      {...args}>
      {props.children}
    </div>
  )
}
