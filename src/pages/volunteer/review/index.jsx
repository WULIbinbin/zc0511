import { Component } from "react";
import { View, ScrollView } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import {
  VolTitle,
  VolTestInfo,
  VolPayment,
  VolTable,
  VolReport
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
        <VolTitle title="志愿审核报告" desc="报告单号：CYZY-0000001"></VolTitle>
        <VolTestInfo />
        <VolTable showData={false} todo='/pages/volunteer/batch/index'/>
        <VolPayment />
        <VolReport />
      </View>
    );
  }
}

export default Index;
