import React, { createRef, useEffect, useState } from "react"

type TooltipProps = {
  children?: string | undefined
}

export const Tooltip: React.FC<TooltipProps> = (props) => {
  const { children } = props

  const tooltipRef = createRef<HTMLDivElement>()

  const [adapter, setAdapter] = useState({
    tooltipShown: false,
  })

  useEffect(() => {
    const onMouseOverHandle = (e: MouseEvent) => {
      setAdapter((prevState) => ({ ...prevState, tooltipShown: true }))
    }
    const onMouseOutHandle = (e: MouseEvent) => {
      setAdapter((prevState) => ({ ...prevState, tooltipShown: false }))
    }
    if (tooltipRef.current) {
      const tooltipParent = tooltipRef.current.parentElement
      tooltipParent.addEventListener("mouseover", onMouseOverHandle)
      tooltipParent.addEventListener("mouseout", onMouseOutHandle)
    }
  }, [tooltipRef.current])

  return (
    <div
      ref={tooltipRef}
      style={{ zIndex: 999, opacity: adapter.tooltipShown ? 1 : 0 }}
      className={`arrow-down absolute bottom-full left-1/2 w-max -translate-x-1/2 transform items-center justify-center rounded-xl bg-black p-1.5 px-3 text-white shadow transition-opacity`}>
      <div
        className="absolute top-full left-1/2 inline-block h-0 w-0 -translate-x-1/2 transform"
        style={{
          borderRight: "6px solid transparent",
          borderLeft: "6px solid transparent",
          borderTop: "6px solid black",
        }}
      />
      {children}
    </div>
  )
}
