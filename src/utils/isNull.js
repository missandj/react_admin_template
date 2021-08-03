export function isNull(obj) {
  let flag = false
  if (obj == "" || obj == null || obj == undefined || obj.length == 0) {
    flag = true
  }
  return flag
}
