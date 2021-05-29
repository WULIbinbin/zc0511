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

export function SaveStar(data = {}) {
  return Request({
    url: `/student/saveStar`,
    method: "POST",
    data,
  });
}
