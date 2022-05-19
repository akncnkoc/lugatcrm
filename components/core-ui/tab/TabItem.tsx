import { AnimatePresence, motion } from "framer-motion"
import React from "react"
import styled from "styled-components"

type TabItemProps = {
  activeTab?: string
  label: string
  onClick?: (e: string) => void
  index?: number
}

const TabItemContainer = styled.li<{ activeTab: string; label: string }>`
  border-bottom: 1px solid transparent;
  color: ${(props) => (props.activeTab === props.label ? "#3949ab" : "black")};
  position: relative;
  cursor: pointer;
  padding-bottom: 16px;
  font-size: 18px;
  transition: 300ms color;
`

const TabItem: React.FC<TabItemProps> = (props) => {
  const { activeTab, label, onClick, index } = props
  let itemOnClick = () => {
    onClick && onClick(label)
  }
  return (
    <TabItemContainer activeTab={activeTab} label={label} onClick={itemOnClick}>
      <AnimatePresence exitBeforeEnter>
        {activeTab === label && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            className={"absolute  top-full left-0 h-[2px] w-full bg-indigo-600"}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              height: "2px",
              width: "100%",
              backgroundColor: "#3949ab",
            }}
          />
        )}
      </AnimatePresence>
      {label}
    </TabItemContainer>
  )
}
export default TabItem
