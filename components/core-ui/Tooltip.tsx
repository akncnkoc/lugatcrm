import React, { createRef, useEffect, useState } from "react"
import styled from "styled-components"
import FadeIn from "./FadeIn"

type TooltipProps = {
  children?: string | undefined
}

const TooltipContainer = styled.div`
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  width: max-content;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 400;
  background: var(--light);
  padding: 6px 12px;
  color: var(--dark);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.20);
  transition: 500ms color, box-shadow, background-color, opacity;
  z-index: 999;
`

const TooltipArrow = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  display: inline-block;
  height: 0;
  width: 0;
  transform: translateX(-50%);
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  border-top: 6px solid var(--light);
`

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
    <div ref={tooltipRef}>
      {adapter.tooltipShown && (
        <FadeIn duration={500}>
          <TooltipContainer>
            <TooltipArrow />
            {children}
          </TooltipContainer>
        </FadeIn>
      )}
    </div>
  )
}
