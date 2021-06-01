import { Request } from "../index";

export function GetBanner(data = {}) {
  return Request({
    url: `/wx/miniprogram/user/getBanner`,
    data,
  });
}

export function GetMySchoolList(type) {
  return Request({
    url: `/student/schoolList/${type}`,
    data:{},
  });
}
