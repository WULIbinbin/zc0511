import { observable } from "mobx";
import Taro from "@tarojs/taro";
import {
  GetSid,
  PhoneRegister,
  GetToken,
  SendCode,
  VerifyCode,
} from "../request/apis/account";
import { GetStuInfo } from "../request/apis/inform";
import Subject from "./subject";
import Common from "./common";

const account = observable({
  userInfo: {},
  loginInfo: {
    code: "",
    phoneNumber: "",
    openId: "",
    access_token: "",
    token_type: "",
  },
  get isVip() {
    return (
      this.userInfo && this.userInfo.student && !!this.userInfo.student.vip
    );
  },
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
        .then(() => {
          return GetSid({
            code: that.loginInfo.code,
          }).then((res) => {
            console.log("==========================>wxlogin成功", res);
            const { sessionKey, openid } = res.data;
            const openId = openid;
            PhoneRegister({
              sessionKey,
              encryptedData,
              iv,
              openId,
            })
              .then((res) => {
                console.log("============================>获取手机号成功", res);
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
  PhoneLogin({ phoneNum = "", code = "" }) {
    const that = this;
    return new Promise((resolve, reject) => {
      this.CheckCode().then(() => {
        return GetSid({
          code: that.loginInfo.code,
        })
          .then((res) => {
            console.log("==========================>wxlogin成功", res);
            const { openid } = res.data;
            const openId = openid;
            return VerifyCode({ phoneNum, code, openId }).then((res) => {
              if (res.status === 0) {
                GetToken(phoneNum)
                  .then((res) => {
                    console.log(res);
                    const loginInfo = {
                      ...res.data,
                      openId,
                      phoneNumber: phoneNum,
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
              } else {
                Taro.showToast({ title: "手机验证码错误", icon: "none" });
                return Promise.reject();
              }
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
    });
  },
  CheckCode() {
    const that = this;
    const getCode = (resolve) => {
      wx.login({
        success(res) {
          console.log("======================>重新获取code", res.code);
          that.loginInfo.code = res.code;
          resolve(res.code);
        },
        fail(err) {
          console.log("wx.login error", err);
        },
      });
    };
    return new Promise((resolve, reject) => {
      wx.checkSession({
        success() {
          const { code } = that.loginInfo;
          if (!!code) {
            resolve(code);
          } else {
            getCode(resolve);
          }
        },
        fail() {
          console.log("======================>code已过期");
          getCode(resolve);
        },
      });
    });
  },
  GetUserInfo() {
    const that = this;
    console.log(that, Subject);
    GetStuInfo().then((res) => {
      wx.setStorageSync("userInfo", res.data);
      const { student, subList } = res.data;
      student.sex = student.sex ? "男" : "女";
      student.area = Common.zxCity.includes(student.province)
        ? student.city + student.district
        : student.province + student.city;
      that.userInfo = {
        subList,
        student,
      };
    });
  },
});

export default account;
