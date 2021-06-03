import { Component } from "react";
import { View, ScrollView, Image, Button } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import {
  HomeBanner,
  HomeTitle,
  HomeNavigator,
  HomeServer,
  PageView,
} from "../../components/index";
import Taro from "@tarojs/taro";
import { GetBanner } from "../../request/apis/home";
import { GetOrderByType } from "../../request/apis/report";
import { WxPay } from "../../request/apis/account";
import "./index.scss";

import HomeBanner2Png from "../../static/image/home-banner2.png";

@inject("store")
@observer
class Index extends Component {
  state = {
    banner: [],
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {
    const {
      options: { scene },
    } = getCurrentPages()[getCurrentPages().length - 1];
    console.log("================>scene", scene);
    if (scene) {
      wx.setStorageSync("scene", scene);
    }
    const storage = wx.getStorageSync("token");
    const { store } = this.props;
    store.Account.CheckCode().then(() => {
      if (storage && storage.access_token && storage.phoneNumber) {
        store.Account.GetUserInfo();
        store.Review.getOrderStatus();
        store.Tutor.getOrderStatus();
        store.Tutor.getOnline();
        store.Recommend.getInfo();
        store.Common.getAllPrice()
      }
    });
    GetBanner().then((res) => {
      this.setState({ banner: res.data });
    });
  }

  componentDidHide() {}

  gotoGuide() {
    const {
      Account: { studentInfo },
    } = this.props.store;
    if (!studentInfo.id) {
      Taro.showModal({
        title: "您还未登录",
        content: "请授权手机登录",
      }).then((res) => {
        if (res.confirm) {
          Taro.navigateTo({
            url: "/pages/login/index",
          });
        }
      });
      return;
    }
    Taro.navigateTo({
      url: "/pages/vip/guide/index",
    });
  }

  testPay() {
    WxPay(1)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onShareAppMessage() {
    const {
      Account: { studentInfo },
    } = this.props.store;
    return {
      title: "邀请推荐官",
      path: `/pages/home/index?scene=${studentInfo.id}`,
    };
  }

  render() {
    const { banner } = this.state;
    return (
      <PageView bgColor="#f7f7f7">
        <View className="b-home">
          <HomeBanner banner={banner} />
          <HomeNavigator />
          <HomeTitle title="人工智能指导" />
          <Image
            className="b-home-poster"
            src={HomeBanner2Png}
            onClick={this.gotoGuide.bind(this)}
          ></Image>
          <HomeTitle title="志愿填报服务" />
          <HomeServer />
        </View>
      </PageView>
    );
  }
}

export default Index;
