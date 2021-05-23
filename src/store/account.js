import { observable } from "mobx";
import Taro from "@tarojs/taro";
import { GetSid, PhoneRegister, GetToken } from "../request/apis/account";

const account = observable({
  userInfo: {},
  loginInfo: { phoneNumber: "", access_token: "", token_type: "" },
  WxLogin({ encryptedData, iv, errMsg }) {
    return this.CheckCode()
      .then((code) => {
        return GetSid({
          code,
        }).then((res) => {
          console.log("wxlogin成功====》", res);
          const { sessionKey } = res;
          return PhoneRegister({
            sessionKey,
            encryptedData,
            iv,
          }).then((res) => {
            console.log("获取手机号成功====》", res);
            this.loginInfo.phoneNumber = res.phoneNumber;
            return GetToken(res.phoneNumber).then((res) => {
              console.log(res);
              wx.setStorageSync("token", res.data);
            });
          }).catch(err=>Promise.reject(err));
        });
      })
      .catch((err) => {
        console.log(err);
        Taro.showToast({
          title: "登录失败，请重试",
          icon: "none",
        });
      });
  },
  CheckCode() {
    const getCode = (resolve) => {
      wx.login({
        success(res) {
          resolve(res.code);
        },
        fail(err) {
          console.log("wx.login error", err);
        },
      });
    };
    return new Promise((resolve, reject) => {
      getCode(resolve);
      // wx.checkSession({
      //   success() {
      //     const code = wx.getStorageSync("code");
      //     if (!!code) {
      //       resolve(code);
      //     } else {
      //       getCode(resolve);
      //     }
      //   },
      //   fail() {
      //     getCode(resolve);
      //   },
      // });
    });
  },
});

export default account;
