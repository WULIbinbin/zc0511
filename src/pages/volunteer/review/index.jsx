import { Component } from "react";
import { View, ScrollView } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import {
  VolTitle,
  VolTestInfo,
  VolPayment,
  VolTable,
  VolReport,
} from "../components/index";
import { PreferenceList } from "../../../request/apis/report";
import "./index.scss";

@inject("store")
@observer
class Index extends Component {
  state = {
    isPay: 1,
    ai: 1,
    college: [],
    school: [],
  };

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {
    this.getOrderStatus();
  }

  componentDidHide() {}

  getOrderStatus() {
    const { Review } = this.props.store;
    Review.getReviewOrder();
  }

  render() {
    return (
      <View className="b-vol-page">
        <VolTitle
          title="志愿审核报告"
          type="review"
          desc="报告单号：CYZY-0000001"
        ></VolTitle>
        <VolTestInfo />
        <VolTable />
        <VolPayment />
        <VolReport/>
      </View>
    );
  }
}

export default Index;
