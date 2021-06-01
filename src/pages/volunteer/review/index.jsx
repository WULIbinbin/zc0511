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
  state = {
    isPay: 1,
    ai: 1,
    college: [],
    school: [],
  };

  componentDidMount() {
    this.getOrderStatus();
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  getOrderStatus() {
    const { Review } = this.props.store;
    Review.getReviewOrder();
    Review.getOrderStatus();
  }

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
        <VolTestInfo />
        <VolTable />
        <VolPayment />
        <VolReport />
        {isNeedPay == false && report.payStatus == true && (
          <View className="b-vol-reset">
            <View
              className="b-vol-reset-btn"
              onClick={() => {
                Review.resetOrderData();
              }}
            >
              增加审核次数
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default Index;
