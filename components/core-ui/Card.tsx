import React from "react"
import styled from "styled-components"

const Card = styled.div`
  height: 100%;
  width: 100%;
  border-radius: ${(props) => props.theme.general[4]};
  padding-left: ${(props) => props.theme.general[4]};
  padding-right: ${(props) => props.theme.general[4]};
  background-color: white;
  box-shadow: ${(props) => props.theme.shadow.md};
`
export const CardHeader = styled.div<{ hasAction?: boolean }>`
  display: flex;
  height: ${(props) => props.theme.general[16]};
  width: 100%;
  align-items: center;
  padding: ${(props) => props.theme.general[10]}
    ${(props) => props.theme.general[4]};
  justify-content: ${(props) => props.hasAction && "space-between"};
`

export const CardContent = styled.div`
  height: max-content;
  width: 100%;
  border-top: 1px solid ${(props) => props.theme.border.gray["300"]};
  padding-bottom: ${(props) => props.theme.general[4]};
  padding-top: ${(props) => props.theme.general[4]};
`
export const CardTitle = styled.h1`
  font-weight: 500;
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
