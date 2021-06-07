import { Component } from "react";
import { View, Image, Text } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import Taro from "@tarojs/taro";
import { WxPay } from "../../../request/apis/account";
import "./index.scss";
import { GetOrderById } from "../../../request/apis/report";
import ClosePng from "../../../static/image/close-gray.png";
import titlePng from "../../../static/image/tihsi.png";

import Lock from "../../../static/image/lock.png";

import Tuxing1 from "../../../static/image/tuxing1-2.png";
import Tuxing2 from "../../../static/image/tuxing2-2.png";
// import Tuxing3 from "../../../static/image/tuxing3-2.png";

@inject("store")
@observer
class Index extends Component {
  state = {
    showDialog: false,
  };

  componentWillMount() {
    const { Common } = this.props.store;
    Common.getAllPrice();
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handlePay() {
    const { Tutor, Review, Account } = this.props.store;
    WxPay(1).then((res) => {
      console.log(res);
      GetOrderById(res.data.id).then((res) => {
        Account.GetUserInfo();
        Tutor.getOrderStatus();
        Review.getOrderStatus();
        this.handleToggle();
      });
    });
  }

  gotoExample() {
    Taro.navigateTo({
      url: "/pages/example/index/index",
    });
  }

  handleToggle() {
    this.setState({
      showDialog: !this.state.showDialog,
    });
  }

  render() {
    const { showDialog } = this.state;
    const { Tutor, Review, Account, Common } = this.props.store;
    const guideItems = [
      {
        title: "志愿填报辅导",
        desc: "推荐最优院校最适合的专业",
        bg: Tuxing1,
        isLock: !Tutor.hasPay && !Account.isVip,
        link: "/pages/volunteer/tutor/index",
      },
      {
        title: "志愿审核服务",
        desc: "分析所填的志愿方案",
        bg: Tuxing2,
        isLock: !Review.hasPay && !Account.isVip,
        link: "/pages/volunteer/review/index",
      },
      // {
      //   title: "志愿填报综合报告",
      //   desc: "形成全面分析报告",
      //   bg: Tuxing3,
      // },
    ];
    return (
      <View className="b-guide-page">
        <View className="bg">
          {guideItems.map((n) => (
            <View
              className="server-item"
              onClick={() => {
                if (!n.isLock) {
                  Taro.navigateTo({
                    url: n.link,
                  });
                }
              }}
            >
              <View className="content">
                {n.isLock && (
                  <View className="right-top">
                    <Image className="lock" src={Lock}></Image>
                  </View>
                )}
                <View className="title">{n.title}</View>
                <View className="desc">{n.desc}</View>
                <Image className="b-bg" mode="heightFix" src={n.bg}></Image>
              </View>
            </View>
          ))}
        </View>
        {!Common.isReviewing && !Account.isVip && (
          <>
            <View
              className="b-vol-page-button-group"
              onClick={this.handleToggle.bind(this)}
            >
              <View className="b-vol-page-button b-vol-page-button-left">
                <View className="b-vol-page-button-money">￥</View>
                {Common.vipPrice.value}
              </View>
              <View className="b-vol-page-button b-vol-page-button-right">
                立即解锁
              </View>
            </View>
            <View className="example" onClick={this.gotoExample}>
              看看 示例报告
            </View>
          </>
        )}
        {Common.isReviewing && !Account.isVip && (
          <>
            <View
              className="b-vol-page-button-group"
              onClick={()=>{
                Taro.showToast({title:'苹果用户暂时无法解锁，请稍后',icon:'none'})
              }}
            >
              <View className="b-vol-page-button b-vol-page-button-lock">
                立即解锁
              </View>
            </View>
            <View className="example" onClick={this.gotoExample}>
              看看 示例报告
            </View>
          </>
        )}
        {showDialog && (
          <View className="b-payment-dialog">
            <View className="b-payment-dialog-body">
              <View className="b-payment-dialog-main">
                <Image
                  className="b-payment-dialog-close-icon"
                  src={ClosePng}
                  onClick={this.handleToggle.bind(this, false)}
                ></Image>
                <View className="b-payment-dialog-top">
                  <Image
                    className="b-payment-dialog-icon"
                    src={titlePng}
                  ></Image>
                  <View className="b-payment-dialog-top-title">开通VIP</View>
                  <Image
                    className="b-payment-dialog-icon"
                    src={titlePng}
                  ></Image>
                </View>
                <View className="b-payment-dialog-content">
                  <Text className="b-payment-dialog-money">
                    ￥
                    <Text className="b-payment-dialog-moneynum">
                      {Common.vipPrice.value}
                    </Text>
                  </Text>
                  <Text className="b-payment-dialog-desc">
                    成为会员后可解锁更多权限
                  </Text>
                </View>
                <View
                  className="b-payment-dialog-btn"
                  onClick={this.handlePay.bind(this)}
                >
                  立即解锁
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default Index;
