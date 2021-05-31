import { Request } from "../index";
import Taro from "@tarojs/taro";

export function GetSid(data = {}) {
  return Request({
    url: `/wx/miniprogram/user/login`,
    data,
  });
}

export function PhoneRegister(data = {}) {
  return Request({
    url: `/wx/miniprogram/user/phone`,
    data,
  });
}

export function GetToken(phoneNum) {
  return Request({
    url: `/oauth/token`,
    data: {
      clientId: "098f6bcd4621d373cade4e832627b4f2",
      phoneNum,
    },
    method: "POST",
  });
}

//type (枚举：1：vip；2：报告；3：专家审核；4：智能审核)
export function WxPay(type) {
  return new Promise((resolve, reject) => {
    Request({
      url: `/wx/miniprogram/pay/${type}`,
      data: {},
      method: "POST",
    })
      .then((res) => {
        const {
          nonceStr,
          paySign,
          packageValue,
          signType,
          timeStamp,
        } = res.data;
        const payParams = {
          timeStamp,
          nonceStr,
          package: packageValue,
          signType,
          paySign,
        };
        console.log(payParams);
        Taro.requestPayment(payParams)
          .then((payResult) => {
            resolve(res);
          })
          .catch((payError) => {
            reject({ status: 100001, message: "用户已取消" });
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
}
