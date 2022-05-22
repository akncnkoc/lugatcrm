import React from "react"
import styled from "styled-components"

const Card = styled.div`
  width: 100%;
  border-radius: 0.42rem;
  background-color: white;
  box-shadow: 0 0 30px 0 rgb(82 63 105 / 5%);
`
export const CardHeader = styled.div<{ hasAction?: boolean }>`
  display: flex;
  width: 100%;
  align-items: center;
  min-height: 70px;
  padding: 0 1.30rem;
  justify-content: ${(props) => props.hasAction && "space-between"};
`

export const CardContent = styled.div`
  height: max-content;
  width: 100%;
  border-top: 1px solid ${(props) => props.theme.border.gray["300"]};
  padding: ${(props) => props.theme.general[4]};
`
export const CardTitle = styled.h1`
  font-weight: 500;
  font-size: 1.100rem;
  color: #181C32;
  margin:0;
`
export const CardActions = styled.div`
  display: flex;

  > {
    margin-right: calc(0.5rem * 0);
    margin-left: calc(0.5rem * calc(1 - 0));
    border-top: 1px solid ${(props) => props.theme.border.gray["300"]};
  }
`
export const CardFooter = styled.div`
  display: flex;
  height: ${(props) => props.theme.general[16]};
  width: 100%;
  align-items: center;
  justify-content: flex-end;
`
export default Card
