import { AnimatePresence, motion } from "framer-motion"
import React from "react"
import styled from "styled-components"

type TabItemProps = {
  activeTab?: string
  label: string
  onClick?: (e: string) => void
  index?: number
}

const TabItemContainer = styled(motion.li)<{
  activetab: string
  label: string
}>`
  border-bottom: 1px solid transparent;
  color: ${(props) => (props.activetab === props.label ? "#3949ab" : "black")};
  position: relative;
  cursor: pointer;
  padding-bottom: 16px;
  font-size: 18px;
  transition: 300ms color;
`

const TabItemContent = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  height: 2px;
  width: 100%;
  background-color: #3949ab;
`
const TabItem: React.FC<TabItemProps> = (props) => {
  const { activeTab, label, onClick, index } = props
  let itemOnClick = () => {
    onClick && onClick(label)
  }
  return (
    <TabItemContainer activetab={activeTab} label={label} onClick={itemOnClick}>
      <AnimatePresence>
        {activeTab === label && (
          <TabItemContent
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
          />
        )}
      </AnimatePresence>
      {label}
    </TabItemContainer>
  )
}
export default TabItem
