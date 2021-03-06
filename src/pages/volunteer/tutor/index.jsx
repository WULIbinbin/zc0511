import { Component } from "react";
import { View, ScrollView } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { PageView } from "../../../components/index";
import Taro from "@tarojs/taro";
import {
  VolTitle,
  VolTestInfo,
  VolPreference,
  VolModal,
  VolRecommend,
  VolSubject,
} from "../components/index";
import { WxPay } from "../../../request/apis/account";
import { GetOrderById, PayHolland } from "../../../request/apis/report";

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
    Tutor.getHolland();
  }

  handlePay() {
    const {
      Tutor: { hollandTypeList },
      Account: { studentInfo, subjectInfo },
    } = this.props.store;
    if (subjectInfo.length === 0 || !studentInfo.id) {
      Taro.showToast({ title: "请先填写考试信息", icon: "none" });
      return;
    }
    if (subjectInfo.findIndex((s) => s.star != null) === -1) {
      Taro.showToast({ title: "请先填写课程偏好", icon: "none" });
      return;
    }
    if (hollandTypeList.length === 0) {
      Taro.showToast({ title: "请完成霍兰德测试", icon: "none" });
      return;
    }
    WxPay(2).then((res) => {
      console.log(res);
      GetOrderById(res.data.id).then((res) => {
        Taro.showToast({
          title: "支付成功,可以在 “我的报告中”查看",
          icon: "none",
        });
        this.getOrderStatus();
      });
    });
  }

  handlePayFree() {
    const {
      Tutor: { hollandTypeList },
      Account: { studentInfo, subjectInfo },
    } = this.props.store;
    if (subjectInfo.length === 0 || !studentInfo.id) {
      Taro.showToast({ title: "请先填写考试信息", icon: "none" });
      return;
    }
    if (subjectInfo.findIndex((s) => s.star != null) === -1) {
      Taro.showToast({ title: "请先填写课程偏好", icon: "none" });
      return;
    }
    if (hollandTypeList.length === 0) {
      Taro.showToast({ title: "请完成霍兰德测试", icon: "none" });
      return;
    }
    PayHolland().then((res) => {
      if (res.status == 0) {
        Taro.showToast({
          title: "提交成功,可以在 “我的报告中”查看",
          icon: "none",
        });
        this.getOrderStatus();
      } else {
        Taro.showToast({ title: "提交失败，请重试", icon: "none" });
      }
    });
  }

  handleExample() {
    Taro.navigateTo({
      url: "/pages/example/index/index",
    });
  }

  render() {
    const {
      Tutor,
      Tutor: { isPay, orderStatus },
      Common,
    } = this.props.store;
    return (
      <View className="b-vol-page">
        <VolTitle
          title="志愿填报推荐"
          desc={Tutor.orderNum ? `报告单号：${Tutor.orderNum}` : ""}
        ></VolTitle>
        <VolTestInfo />
        {isPay && <VolRecommend />}
        <VolPreference showData={false} />
        <VolModal showData={false} />
        {!Common.isReviewing && !isPay && orderStatus.isNeedPay == true && (
          <View
            className="b-vol-page-button-group"
            onClick={this.handlePay.bind(this)}
          >
            <View className="b-vol-page-button b-vol-page-button-left">
              <View className="b-vol-page-button-money">￥</View>
              {Common.reportPrice.value}
            </View>
            <View className="b-vol-page-button b-vol-page-button-right">
              单项解锁
            </View>
          </View>
        )}
        {orderStatus.isNeedPay == false &&
          orderStatus.report.payStatus == false && (
            <View
              className="b-vol-page-free-btn"
              onClick={this.handlePayFree.bind(this)}
            >
              立即提交
            </View>
          )}
        {!!Common.isReviewing && orderStatus.isNeedPay == true && (
          <View
            className="b-vol-page-button-group"
            onClick={() => {
              Taro.showToast({
                title: "苹果用户暂时无法解锁，请稍后",
                icon: "none",
              });
            }}
          >
            <View className="b-vol-page-button b-vol-page-button-lock">
              立即解锁
            </View>
          </View>
        )}
        {!Common.isReviewing && !isPay && (
          <View
            className="b-vol-page-bottom-example"
            onClick={this.handleExample}
          >
            看看 示例报告
          </View>
        )}
      </View>
    );
  }
}

export default Index;
