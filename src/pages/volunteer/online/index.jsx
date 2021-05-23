import { Component } from "react";
import { View, Image } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import {
  VolTitle,
  VolTestInfo,
  VolModal,
  VolPreference,
} from "../components/index";
import "./index.scss";

import OnlineBg from "../image/online-bg.png";

@inject("store")
@observer
class Index extends Component {
  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="b-vol-page">
        <View className="b-vol-online-top">
          <Image
            className="b-vol-online-bg"
            mode="widthFix"
            src={OnlineBg}
          ></Image>
        </View>
        <VolTestInfo />
        <VolPreference />
        <VolModal />
        <View className="b-vol-page-bottom-desc">
          注：由于该理论1959年提出，有些职业在这几十年间发生了很大的变化，甚至已经消失，我们本着尊重全球性著名专家的原则，并未删除或更改，直接展示给测试者。
        </View>
        <View className="b-vol-page-button-group">
          <View className="b-vol-page-button b-vol-page-button-left">
            <View className="b-vol-page-button-money">￥</View>299.00
          </View>
          <View className="b-vol-page-button b-vol-page-button-right">
            立即解锁
          </View>
        </View>
        <View className="b-vol-online-btn">
          已支付，将会有教育专家与您联系！
        </View>
      </View>
    );
  }
}

export default Index;
