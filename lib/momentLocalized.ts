import moment from "moment"
import "moment/locale/tr"

export const MomentLocalized = (date): string => {
  return moment(date).locale("tr").fromNow()
}
export const MomentFormatted = (
  date: string | Date,
  format = "DD.MM.YYYY HH:SS"
): string => {
  return moment(date).format(format)
}
