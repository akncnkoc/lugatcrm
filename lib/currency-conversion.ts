export const currencyConversion = (raw: number) => {
  const fractionDigits = 2
  const decimal = ","
  const seperator = "."

  const neg = raw < 0 ? "-" : ""
  const wholePart = parseInt(Math.abs(+raw || 0).toFixed(fractionDigits)) + ""
  const seperatorIndex = wholePart.length > 3 ? wholePart.length % 3 : 0
  return (
    neg +
    (seperatorIndex ? wholePart.substring(0, seperatorIndex) + seperator : "") +
    wholePart.substring(seperatorIndex).replace(/(\d{3})(?=\d)/g, "$1") +
    (fractionDigits
      ? decimal +
        Math.abs(raw - parseInt(wholePart))
          .toFixed(fractionDigits)
          .slice(2)
      : "")
  )
}
export const formatMoney = (raw: string) => {
  return currencyConversion(Number(raw))
}
