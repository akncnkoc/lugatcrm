const Color = require("color")
const darken = (clr, val) => Color(clr).darken(val).rgb().string()
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./modals/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "gray-filler": "#EEF0F8",
        "aside-filler": "#1e1e2d",
        "gray-color": "#a2a3b7",
        "active-aside-menu": "#1b1b28",
        "btn-blue": "#3699FF",
        "table-text-color": "#181c32",
        "darker-btn": darken("#3699FF", 0.75),
      },
      padding: {
        select: "6.15px 26px 6.15px 9.75px",
        input: "7.8px 12px",
      },
      height: {
        select: "calc(1.35em + 1.1rem)",
        "500px": "500px",
      },
      fontSize: {
        "13px": "13px",
      },
      minWidth: {
        "250px": "250px",
        "500px": "500px",
        "10xl" : "120rem"
      },
      minHeight: {
        "250px": "250px",
        "500px": "500px",
      },
      maxWidth:{
        "10xl" : "120rem"
      },
      inset: {
        7.5: "30px",
      },
      zIndex: {
        999: "999",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
