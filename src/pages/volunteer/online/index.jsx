import { Component } from "react";
import { View, Image } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import {
  VolTitle,
  VolTestInfo,
  VolModal,
  VolPreference,
  VolContact,
} from "../components/index";
import {
  GetContact,
  PostContact,
  GetOrderById,
} from "../../../request/apis/report";
import { WxPay } from "../../../request/apis/account";
import Taro from "@tarojs/taro";
import "./index.scss";

import OnlineBg from "../image/online-bg.png";

@inject("store")
@observer
class Index extends Component {
  state = {
    formData: {
      tel: "",
      wx: "",
    },
    orderStatus: {
      status: 0,
    },
  };
  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {
    this.getOrderStatus();
  }

  componentDidHide() {}

  getOrderStatus() {
    const { Tutor } = this.props.store;
    Tutor.getHolland();
    GetContact().then((res) => {
      console.log(res);
      if (res.data == null) return;
      const { wx, tel } = res.data;
      this.setState({
        orderStatus: res.data,
        formData: {
          wx,
          tel,
        },
      });
    });
  }

  handleContact(formData) {
    this.setState({
      formData,
    });
  }

  handlePay() {
    const { formData } = this.state;
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
    if (formData.wx == "" || formData.tel == "") {
      Taro.showToast({ title: "请先填写联系方式", icon: "none" });
      return;
    }
    WxPay(5).then((res) => {
      console.log(res);
      Taro.showToast({ title: "支付成功", icon: "none" });
      GetOrderById(res.data.id).then((res) => {});
      PostContact(formData).then((res) => {});
      this.getOrderStatus();
    });
  }

  render() {
    const { formData, orderStatus } = this.state;
    const { Common } = this.props.store;
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
        <VolModal hideMajor={true} />
        {orderStatus.status == 1 && (
          <View className="b-vol-page-bottom-desc">
            注：由于该理论1959年提出，有些职业在这几十年间发生了很大的变化，甚至已经消失，我们本着尊重全球性著名专家的原则，并未删除或更改，直接展示给测试者。
          </View>
        )}
        <VolContact {...formData} onSubmit={this.handleContact.bind(this)} />
        {orderStatus.status == 1 ? (
          <View className="b-vol-online-btn">
            已支付，将会有教育专家与您联系！
          </View>
        ) : !!Common.isReviewing ? (
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
        ) : (
          <View
            className="b-vol-page-button-group"
            onClick={this.handlePay.bind(this)}
          >
            <View className="b-vol-page-button b-vol-page-button-left">
              <View className="b-vol-page-button-money">￥</View>
              {Common.onlinePrice.value}
            </View>
            <View className="b-vol-page-button b-vol-page-button-right">
              立即解锁
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default Index;
