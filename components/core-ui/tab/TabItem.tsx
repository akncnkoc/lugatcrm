import { AnimatePresence, motion } from "framer-motion"
import React from "react"

type TabItemProps = {
  activeTab?: string
  label: string
  onClick?: (e: string) => void
  index?: number
}

const TabItem: React.FC<TabItemProps> = (props) => {
  const { activeTab, label, onClick, index } = props
  let itemOnClick = () => {
    onClick && onClick(label)
  }
  return (
    <motion.li
      className={`border-b border-transparent ${
        activeTab === label ? "text-indigo-600" : "text-black"
      } relative cursor-pointer pb-4 text-lg transition-colors`}
      onClick={itemOnClick}>
      <AnimatePresence exitBeforeEnter>
        {activeTab === label && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            className={"absolute  top-full left-0 h-[2px] w-full bg-indigo-600"}
          />
        )}
      </AnimatePresence>
      {label}
    </motion.li>
  )
}
export default TabItem;