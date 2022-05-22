import moment from "moment"
import "moment/locale/tr"

export const MomentLocalized = (date): string => {
  return moment(date).locale("tr").fromNow()
}
export const MomentFormatted = (
  date: string | Date,
  format = "DD.MM.YYYY HH:mm"
): string => {
  return moment(date).locale("tr").format(format)
}
export const MomentISO8061 = (
  date: string | Date,
): string => {
  return moment(date).format()
}