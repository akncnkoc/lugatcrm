import React from "react"
import styled from "styled-components"

const Card = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 4px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: white;
  box-shadow: 0px 1px 3px rgba(30 30 45 / 0.2);
`
export const CardHeader = styled.div<{ hasAction?: boolean }>`
  display: flex;
  height: 64px;
  width: 100%;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  padding-left: 16px;
  padding-right: 16px;
  justify-content: ${(props) => props.hasAction && "space-between"};
`

export const CardContent = styled.div`
  height: max-content;
  width: 100%;
  border-top: 1px solid;
  border-top-color: rgb(238 240 248 / 1);
  padding-bottom: 16px;
  padding-top: 16px;
`
export const CardTitle = styled.h1`
  font-weight: 500;
`
export const CardActions = styled.div`
  display: flex;
  > {
    margin-right: calc(0.5rem * 0);
    margin-left: calc(0.5rem * calc(1 - 0));
    border: 1px solid;
    border-color: rgb(238 240 248 / 1);
  }
`
export const CardFooter = styled.div`
  display: flex;
  height: 64px;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
`
export default Card
