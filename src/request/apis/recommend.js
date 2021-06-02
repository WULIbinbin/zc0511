import { Request } from "../index";

export function RemApply(data = {}) {
  return Request({
    url: `/recommend/apply`,
    method:'POST',
    data,
  });
}

export function RemInfo(data = {}) {
  return Request({
    url: `/recommend/info`,
    data,
  });
}

export function GetCode(data = {}) {
  return Request({
    url: `/recommend/qrcode`,
    data,
  });
}

export function BindShare(studentId='') {
  return Request({
    url: `/recommend/bind/${studentId}`,
    method:'POST'
  });
}

export function GetShare(data = {}) {
  return Request({
    url: `/recommend/student`,
    data,
  });
}

export function GetIncomeByType(type) {
  return Request({
    url: `/recommend/list`,
    data:{
      type
    },
  });
}

export function GetIncomeChange() {
  return Request({
    url: `/recommend/change`,
  });
}

export function IncomeWithDraw() {
  return Request({
    url: `/recommend/withdraw`,
    method:'POST'
  });
}




