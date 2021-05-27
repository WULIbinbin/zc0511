import { Request } from "../index";

export function SaveInfo(data = {}) {
  return Request({
    url: `/student/save`,
    method: "POST",
    data,
  });
}

export function GetStuInfo() {
  return Request({
    url: `/student/info`,
    method: "GET",
  });
}
