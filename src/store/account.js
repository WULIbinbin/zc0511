import { observable } from "mobx";
import Taro from "@tarojs/taro";
import { GetSid, PhoneRegister, GetToken } from "../request/apis/account";
import { GetStuInfo } from "../request/apis/inform";
import Subject from "./subject";

const account = observable({
  userInfo: {},
  loginInfo: { phoneNumber: "", openId: "", access_token: "", token_type: "" },
  get studentInfo() {
    return (this.userInfo && this.userInfo.student) || {};
  },
  get subjectInfo() {
    return (this.userInfo && this.userInfo.subList) || [];
  },
  WxLogin({ encryptedData, iv, errMsg }) {
    const that = this;
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
                    that.loginInfo = loginInfo;
                    wx.setStorageSync("token", loginInfo);
                    that.GetUserInfo();
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
  GetUserInfo() {
    const that = this;
    console.log(that, Subject);
    GetStuInfo().then((res) => {
      wx.setStorageSync("userInfo", res.data);
      that.userInfo = res.data;
      const { student,subList } = res.data;
      if (student && student.province) {
        const { province, city, district, name, sex } = student;
        Subject.setFormData({
          province,
          city,
          district,
          name,
          sex: sex ? "男" : "女",
        });
        Subject.setCurProv(province);
        Subject.setCurSubList(subList)
      }
    });
  },
});

export default account;
