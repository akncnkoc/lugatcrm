import TabItem from "./TabItem"
import { useEffect, useState } from "react"
import styled from "styled-components"

type TabProps = {
  children: any
}

const TabContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`
const TabListContainer = styled.ol`
  margin: 0 -24px;
  display: flex;
  padding: 24px;
  border-bottom: 1px solid #757575;
  column-gap: 24px;
`

const TabContentContanier = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 20px 0;
`

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
    <TabContainer>
      <TabListContainer>
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
      </TabListContainer>
      <TabContentContanier>
        {children.map((child: any) => {
          if (child.props.label !== activeTab) return undefined
          return child.props.children
        })}
      </TabContentContanier>
    </TabContainer>
  )
}
export default Tab
