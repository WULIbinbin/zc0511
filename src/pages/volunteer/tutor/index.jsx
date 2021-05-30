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
        <VolModal showData={false} todo='/pages/evaluation/readme/index'/>
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
