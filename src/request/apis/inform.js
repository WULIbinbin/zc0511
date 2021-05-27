import { Request } from "../index";

export function SaveInfo(data = {}) {
  return Request({
    url: `/student/save`,
    method: "POST",
    data,
  });
}
