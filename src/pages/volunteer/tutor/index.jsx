import { Component } from "react";
import { View, ScrollView } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { PageView } from "../../../components/index";
import {
  VolTitle,
  VolTestInfo,
  VolPreference,
  VolModal,
  VolRecommend,
  VolSubject,
} from "../components/index";
import "./index.scss";

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
        <VolTitle title="志愿填报推荐" desc="报告单号：CYZY-0000001"></VolTitle>
        <VolTestInfo />
        <VolRecommend />
        <VolPreference showData={false} todo="/pages/volunteer/prefer/index" />
        <VolModal />
        <View className="b-vol-page-bottom-desc">
          注：由于该理论1959年提出，有些职业在这几十年间发生了很大的变化，甚至已经消失，我们本着尊重全球性著名专家的原则，并未删除或更改，直接展示给测试者。
        </View>
        <VolSubject />
        <View className="b-vol-page-button-group">
          <View className="b-vol-page-button b-vol-page-button-left">
            <View className="b-vol-page-button-money">￥</View>99.00
          </View>
          <View className="b-vol-page-button b-vol-page-button-right">
            单项解锁
          </View>
        </View>
        <View className="b-vol-page-bottom-example">看看 示例报告</View>
      </View>
    );
  }
}

export default Index;
