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
import { WxPay } from "../../../request/apis/account";
import { GetOrderById } from "../../../request/apis/report";

import "./index.scss";

@inject("store")
@observer
class Index extends Component {
  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {
    this.getOrderStatus();
  }

  componentDidHide() {}

  getOrderStatus() {
    const { Tutor } = this.props.store;
    Tutor.getOrderStatus();
    Tutor.getRemSchool();
    Tutor.getHolland()
  }

  handlePay() {
    WxPay(2).then((res) => {
      console.log(res);
      GetOrderById(res.data.id).then((res) => {
        this.getOrderStatus();
      });
    });
  }

  render() {
    const {
      Tutor,
      Tutor: { isPay },
      Common
    } = this.props.store;
    return (
      <View className="b-vol-page">
        <VolTitle
          title="志愿填报推荐"
          desc={Tutor.orderNum ? `报告单号：${Tutor.orderNum}` : ""}
        ></VolTitle>
        <VolTestInfo />
        {isPay && <VolRecommend />}
        <VolPreference showData={false} todo="/pages/volunteer/prefer/index" />
        <VolModal showData={false} todo="/pages/evaluation/readme/index" />
        {!isPay && (
          <View
            className="b-vol-page-button-group"
            onClick={this.handlePay.bind(this)}
          >
            <View className="b-vol-page-button b-vol-page-button-left">
              <View className="b-vol-page-button-money">￥</View>{Common.reportPrice.value}
            </View>
            <View className="b-vol-page-button b-vol-page-button-right">
              单项解锁
            </View>
          </View>
        )}
        <View className="b-vol-page-bottom-example">看看 示例报告</View>
      </View>
    );
  }
}

export default Index;
