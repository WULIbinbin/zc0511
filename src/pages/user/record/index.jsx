import { Component } from "react";
import { View, Image } from "@tarojs/components";
import { observer, inject } from "mobx-react";

import "./index.scss";

import Lock from "../../../static/image/lock.png";

@inject("store")
@observer
class Index extends Component {
  state = {
    checked: "个人信息",
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const step = ["个人信息", "成绩信息"];
    const { checked } = this.state;
    return (
      <View className="b-user-record">
        <View className="step-view">
          <View className="step-items">
            {step.map((n, i) => (
              <View className={`item ${n === checked && "checked"}`}>
                <View className="index">{i + 1}</View>
                <View className="name">{n}</View>
              </View>
            ))}
          </View>
        </View>
        <View className={`btn`}>
          <View className="text">下一步</View>
        </View>
        <View className={`btn`}>
          <View className="text">确认</View>
        </View>
      </View>
    );
  }
}

export default Index;
