import TabItem from "./TabItem"
import { useEffect, useState } from "react"

type TabProps = {
  children: any
}

const Tab: React.FC<TabProps> = (props) => {
  const { children } = props
  const [activeTab, setActiveTab] = useState<any>(1)
  let onClickTabItem = (tab: number | string) => {
    setActiveTab(tab)
  }
  useEffect(() => {
    setActiveTab(children[0].props.label)
  }, [children])
  return (
    <div className="tabs flex h-full flex-col">
      <ol className={"-mx-6 flex gap-x-6 border-b border-gray-300 px-6"}>
        {children.map((child: any, index: number) => {
          const { label } = child.props
          return (
            <TabItem
              activeTab={activeTab}
              key={label}
              index={index + 1}
              label={label}
              onClick={onClickTabItem}
            />
          )
        })}
      </ol>
      <div className="flex flex-1 flex-col py-5">
        {children.map((child: any) => {
          if (child.props.label !== activeTab) return undefined
          return child.props.children
        })}
      </div>
    </div>
  )
}
export default Tab;