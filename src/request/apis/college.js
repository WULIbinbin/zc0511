import { Request } from '../index'

export function GetCollegeList(data = {}) {
  return Request({
    url: `/school/search`,
    data
  })
}
