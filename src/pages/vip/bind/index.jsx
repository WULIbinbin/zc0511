import { Component } from "react";
import { View, Image, Input } from "@tarojs/components";
import { observer, inject } from "mobx-react";

import "./index.scss";

@inject("store")
@observer
class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="b-vip-bind-page">
        <View className="b-vip-bind-desc">
          志愿卡将和手机号185****5865进行绑定
        </View>
        <View className="b-vip-bind-content">
          <Input
            className="b-form-input b-vip-bind-input"
            placeholder="请输入志愿卡号"
          ></Input>
          <Input
            className="b-form-input b-vip-bind-input"
            placeholder="请输入志愿卡密"
          ></Input>
        </View>
        <View className="b-vip-bind-btn">立即绑定</View>
      </View>
    );
  }
}

export default Index;
