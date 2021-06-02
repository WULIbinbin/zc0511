import { Request } from "../index";

export function GetBanner(data = {}) {
  return Request({
    url: `/wx/miniprogram/user/getBanner`,
    data,
  });
}

export function GetMySchoolList(type='',params={}) {
  return Request({
    url: `/student/schoolList/${type}`,
    data:params,
  });
}

export function GetAllPrice(){
  return Request({
    url: `/wx/miniprogram/pay/price`,
  });
}
