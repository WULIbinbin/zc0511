import { Component } from "react";
import { View, Input } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { VipCard } from "../../../request/apis/account";
import Taro from "@tarojs/taro";
import "./index.scss";

@inject("store")
@observer
class Index extends Component {
  state = {
    formData: { cardNo: "", secret: "" },
  };
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleInput(key, e) {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        [key]: e.detail.value,
      },
    });
  }

  handleSubmit() {
    const { formData } = this.state;
    if (!formData.cardNo || !formData.secret) {
      Taro.showToast({ title: "请输入卡号和密码", icon: "none" });
      return;
    }
    const { Account } = this.props.store;
    VipCard(formData).then((res) => {
      if (!!res.data) {
        Taro.showToast({ title: "绑定成功", icon: "none" });
        Account.GetUserInfo();
        setTimeout(() => {
          Taro.navigateBack();
        }, 800);
      } else {
        Taro.showToast({
          title: "验证失败，请重试",
          icon: "none",
        });
      }
    });
  }

  render() {
    const {
      Account: { studentInfo },
    } = this.props.store;
    let phoneStr = "";
    if (studentInfo.tel) {
      phoneStr = `${studentInfo.tel.substring(
        0,
        3
      )}****${studentInfo.tel.substring(7, 11)}`;
    }
    const { formData } = this.state;
    return (
      <View className="b-vip-bind-page">
        <View className="b-vip-bind-desc">
          志愿卡将和手机号{phoneStr}进行绑定
        </View>
        <View className="b-vip-bind-content">
          <Input
            className="b-form-input b-vip-bind-input"
            value={formData.cardNo}
            type="number"
            placeholder="请输入志愿卡号"
            onInput={this.handleInput.bind(this, "cardNo")}
          ></Input>
          <Input
            className="b-form-input b-vip-bind-input"
            value={formData.secret}
            type="password"
            placeholder="请输入志愿卡密"
            onInput={this.handleInput.bind(this, "secret")}
          ></Input>
        </View>
        <View className="b-vip-bind-btn" onClick={this.handleSubmit.bind(this)}>
          立即绑定
        </View>
      </View>
    );
  }
}

export default Index;
