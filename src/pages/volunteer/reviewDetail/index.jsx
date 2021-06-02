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
import "./index.scss";

@inject("store")
@observer
class Index extends Component {
  state = {};

  componentDidMount() {
    const {
      options: { id },
    } = getCurrentPages()[getCurrentPages().length - 1];
    const { Review } = this.props.store;
    Review.getOrderDetail(id);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const {
      Review,
      Review: {
        orderStatus: { isNeedPay, report },
      },
    } = this.props.store;
    return (
      <View className="b-vol-page">
        <VolTitle
          title="志愿审核报告"
          type="review"
          desc={Review.orderNum ? `报告单号：${Review.orderNum}` : ""}
        ></VolTitle>
        <VolTestInfo showIcon={false} />
        <VolTable showIcon={false} />
        <VolReport />
      </View>
    );
  }
}

export default Index;
