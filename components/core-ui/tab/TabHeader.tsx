import React from "react"
type TabHeaderProps = {
  label?: string
  value?: string
}
const TabHeader: React.FC<TabHeaderProps> = (props) => {
  const { label, value } = props
  return <div className={`${value}`}>{label}</div>
}

export default TabHeader
