import { Request } from "../index";

export function GetCollegeList(data = {}) {
  return Request({
    url: `/school/search`,
    data,
  });
}

export function GetCollegeDetail(name = "") {
  return Request({
    url: `/school/getSchoolInfo/${name}`,
  });
}

export function GetCollegeScoreLine(name = "", data = {}) {
  return Request({
    url: `/school/getSchoolScore/${name}`,
    data,
  });
}

export function GetSubjectTypeList(data = {}) {
  return Request({
    url: `/major/typeList`,
    data,
  });
}

export function GetSubjectList(data = {}) {
  return Request({
    url: `/major/search`,
    data,
  });
}

export function GetSubjectDetail(code = "") {
  return Request({
    url: `/major/getMajorInfo/${code}`,
  });
}

export function SearchScoreLine(data={}) {
  return Request({
    url: `/score/search`,
    method:'GET',
    data
  });
}