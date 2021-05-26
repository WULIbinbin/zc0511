import { observable } from "mobx";
import Taro from "@tarojs/taro";
import { GetSid, PhoneRegister, GetToken } from "../request/apis/account";

const account = observable({
  userInfo: {},
  loginInfo: { phoneNumber: "", openId: "", access_token: "", token_type: "" },
  WxLogin({ encryptedData, iv, errMsg }) {
    return new Promise((resolve, reject) => {
      this.CheckCode()
        .then((code) => {
          return GetSid({
            code,
          }).then((res) => {
            console.log("wxlogin成功====》", res);
            const { sessionKey, openid } = res.data;
            const openId = openid;
            PhoneRegister({
              sessionKey,
              encryptedData,
              iv,
              openId,
            })
              .then((res) => {
                console.log("获取手机号成功====》", res);
                const { phoneNumber } = res.data;
                GetToken(phoneNumber)
                  .then((res) => {
                    console.log(res);
                    const loginInfo = {
                      ...res.data,
                      openId,
                      phoneNumber,
                    };
                    this.loginInfo = loginInfo;
                    wx.setStorageSync("token", loginInfo);
                    Taro.showToast({
                      title: "登录成功",
                      icon: "success",
                    });
                    resolve(loginInfo);
                  })
                  .catch((err) => {
                    Taro.showToast({
                      title: "登录失败，请重试",
                      icon: "none",
                    });
                    reject(err);
                  });
              })
              .catch((err) => {
                Taro.showToast({
                  title: "登录失败，请重试",
                  icon: "none",
                });
                reject(err);
              });
          });
        })
        .catch((err) => {
          console.log(err);
          Taro.showToast({
            title: "登录失败，请重试",
            icon: "none",
          });
          reject(err);
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
