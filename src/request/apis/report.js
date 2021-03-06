import { Request } from "../index";

export function GetQuestion() {
  return Request({
    url: `/question.json`,
  });
}

export function SubQuestion(data = {}) {
  return Request({
    url: `/student/saveHolland`,
    method: "POST",
    data,
  });
}

export function GetHolland() {
  return Request({
    url: `/student/getHolland`,
    method: "GET",
    data: {},
  });
}

export function PreferenceSearch(code = "") {
  return Request({
    url: `/school/getSchoolName/${code}`,
    method: "GET",
  });
}

export function PreferenceList(data = {}) {
  return Request({
    url: `/preference/list`,
    method: "GET",
    data,
  });
}

export function PreferenceSave(data = {}) {
  return Request({
    url: `/preference/save`,
    method: "POST",
    data,
  });
}

export function PreferenceSaveInfo(data = {}) {
  return Request({
    url: `/preference/saveInfo`,
    method: "POST",
    data,
  });
}

export function SaveStar(data = {}) {
  return Request({
    url: `/student/saveStar`,
    method: "POST",
    data,
  });
}

export function GetOrderById(id = "") {
  return Request({
    url: `/wx/miniprogram/user/queryOrder/${id}`,
    method: "GET",
  });
}

export function GetRecommend() {
  return Request({
    url: `/student/getRecommend`,
    method: "GET",
  });
}

export function GetOrderByType(type) {
  return Request({
    url: `/report/num/${type}`,
    method: "GET",
  });
}

//智能审核立即提交（免费一次版）
export function PayAudit() {
  return Request({
    url: `/preference/payAudit`,
    method: "POST",
  });
}

export function GetContact() {
  return Request({
    url: `/report/online`,
    method: "GET",
  });
}

export function PostContact(params = {}) {
  return Request({
    url: `/report/saveInfo`,
    method: "POST",
    data: params,
  });
}

export function GetOrderList(type=1) {
  return Request({
    url: `/report/list`,
    method: "GET",
    data: { type },
  });
}

export function GetOrderDetail(id) {
  return Request({
    url: `/report/${id}`,
    method: "GET",
  });
}

export function PayHolland() {
  return Request({
    url: `/student/payHolland`,
    method: "POST",
  });
}
