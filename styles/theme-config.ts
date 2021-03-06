import { createGlobalStyle } from "styled-components"

export type ThemeType = typeof defaultTheme

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #EEF0F8;
    font-size: 13px;
    color: #3F4254;
  }
`

export const defaultTheme = {
  primary: "#1E1E2D",
  hover: {
    primary: "#42428A",
  },
  shadow: {
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);",
  },
  general: {
    1: "4px",
    "1.5": "6px",
    2: "8px",
    "2.5": "10px",
    3: "12px",
    "3.5": "14px",
    4: "16px",
    5: "20px",
    6: "24px",
    7: "28px",
    8: "32px",
    9: "36px",
    10: "40px",
    11: "44px",
    12: "48px",
    13: "52px",
    14: "56px",
    15: "60px",
    16: "64px",
  },
  border: {
    gray: {
      300: "#eef0f8",
    },
  },
}

export default defaultTheme
