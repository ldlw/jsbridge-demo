import { wordMap } from "../config/index"

export const cutPrefix = (str, index) => {
  if (str.startsWith(wordMap[index])) {
    return str.slice(2)
  }
  return str
}