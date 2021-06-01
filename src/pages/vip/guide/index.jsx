import { Component } from "react";
import { View, Image } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import Taro from "@tarojs/taro";
import { WxPay } from "../../../request/apis/account";
import "./index.scss";
import { GetOrderById } from "../../../request/apis/report";

import Lock from "../../../static/image/lock.png";

import Tuxing1 from "../../../static/image/tuxing1-2.png";
import Tuxing2 from "../../../static/image/tuxing2-2.png";
// import Tuxing3 from "../../../static/image/tuxing3-2.png";

@inject("store")
@observer
class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handlePay() {
    const { Tutor, Review } = this.props.store;
    WxPay(1).then((res) => {
      console.log(res);
      GetOrderById(res.data.id).then((res) => {
        Tutor.getOrderStatus();
        Review.getOrderStatus();
      });
    });
  }

  gotoExample() {
    Taro.navigateTo({
      url: "/pages/example/index/index",
    });
  }

  render() {
    const { Tutor, Review } = this.props.store;
    const guideItems = [
      {
        title: "志愿填报辅导",
        desc: "推荐最优院校最适合的专业",
        bg: Tuxing1,
        isLock: !Tutor.hasPay,
      },
      {
        title: "志愿审核服务",
        desc: "分析所填的志愿方案",
        bg: Tuxing2,
        isLock: !Review.hasPay,
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
            <View className="server-item">
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
        <View
          className="b-vol-page-button-group"
          onClick={this.handlePay.bind(this)}
        >
          <View className="b-vol-page-button b-vol-page-button-left">
            <View className="b-vol-page-button-money">￥</View>299.00
          </View>
          <View className="b-vol-page-button b-vol-page-button-right">
            立即解锁
          </View>
        </View>
        <View className="example" onClick={this.gotoExample}>
          看看 示例报告
        </View>
      </View>
    );
  }
}

export default Index;
