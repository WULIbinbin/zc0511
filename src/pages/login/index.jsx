import { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text, OpenData, Button, Input } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { FormItem } from "../../components/index";
import { SendCode } from "../../request/apis/account";
import "./index.scss";

@inject("store")
@observer
class Index extends Component {
  state = {
    formData: {
      phoneNum: "",
      code: "",
    },
    type: "auth",
  };
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleGetPhone(e) {
    const { encryptedData, iv, errMsg } = e.detail;
    const { Account } = this.props.store;
    if (errMsg !== "getPhoneNumber:ok") {
      return;
    }
    Account.WxLogin({ encryptedData, iv, errMsg }).then((res) => {
      console.log(res);
      Taro.navigateBack();
    });
  }
  handleChange(key, e) {
    const { formData } = this.state;
    const { value } = e.detail;
    if (key === "phoneNum" && value.length > 11) {
      return;
    }
    this.setState({
      formData: {
        ...formData,
        [key]: value,
      },
    });
  }
  handleCType(type) {
    this.setState({ type });
  }
  handleSendCode() {
    const {
      formData: { phoneNum },
    } = this.state;
    SendCode({ phoneNum })
      .then((res) => {
        if (res.status === 0) {
          Taro.showToast({
            title: "发送成功",
            icon: "none",
          });
        } else {
          return Promise.reject();
        }
      })
      .catch((err) => {
        Taro.showToast({
          title: "发送失败，请重试",
          icon: "none",
        });
      });
  }
  handleSubmit() {
    const { formData } = this.state;
    const { Common, Account } = this.props.store;
    if (!Common.phoneVerify(formData.phoneNum)) {
      Taro.showToast({ title: "请输入正确的手机号", icon: "none" });
      return;
    }
    if (!formData.code) {
      Taro.showToast({ title: "请输入手机验证码", icon: "none" });
      return;
    }
    Account.PhoneLogin(formData).then((res) => {
      Taro.navigateBack()
    });
  }
  render() {
    const { formData, type } = this.state;
    return (
      <View className="b-login-page">
        <View className="b-login-content">
          <View className="b-login-avatar">
            <OpenData className="" type="userAvatarUrl" />
          </View>
          <View
            className="b-login-nickname"
            style={type === "code" ? { marginBottom: 20 } : {}}
          >
            <OpenData type="userNickName" />
          </View>
          {type === "code" && (
            <>
              <FormItem labelWidth={180} contentWidth={460} label="手机号码：">
                <Input
                  className="b-form-input"
                  type="number"
                  value={formData.phoneNum}
                  maxlength={11}
                  onInput={(e) => {
                    this.handleChange("phoneNum", e);
                  }}
                  placeholder="请输入手机号码"
                ></Input>
                {formData.phoneNum.length === 11 && (
                  <Text
                    className="b-login-phonecode"
                    onClick={this.handleSendCode.bind(this)}
                  >
                    发送验证码
                  </Text>
                )}
              </FormItem>
              <FormItem
                labelWidth={180}
                contentWidth={460}
                label="手机验证码："
              >
                <Input
                  className="b-form-input"
                  type="number"
                  value={formData.code}
                  onInput={(e) => {
                    this.handleChange("code", e);
                  }}
                  placeholder="请输入手机验证码"
                ></Input>
              </FormItem>
              <Button
                style="margin-top:30px;"
                className="b-login-btn"
                onClick={this.handleSubmit.bind(this)}
              >
                登录
              </Button>
              <View className="b-login-usecode">
                <Text onClick={this.handleCType.bind(this, "auth")}>
                  使用手机号授权登录
                </Text>
              </View>
            </>
          )}
          {type === "auth" && (
            <>
              <Button
                className="b-login-btn"
                openType="getPhoneNumber"
                onGetPhoneNumber={this.handleGetPhone.bind(this)}
              >
                授权手机号登录
              </Button>
              <View className="b-login-usecode">
                授权失败？
                <Text onClick={this.handleCType.bind(this, "code")}>
                  使用手机验证码登录
                </Text>
              </View>
            </>
          )}
        </View>
      </View>
    );
  }
}

export default Index;
