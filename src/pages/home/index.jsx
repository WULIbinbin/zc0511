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
import { WxPay } from "../../request/apis/account";
import "./index.scss";

@inject("store")
@observer
class Index extends Component {
  state = {
    banner: [],
  };

  componentWillMount() {}

  componentDidMount() {
    GetBanner().then((res) => {
      this.setState({ banner: res.data });
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  testPay() {
    WxPay().then((res) => {
      const {nonceStr,sign,prepayId,mchId} = res.data;
      //String(Math.ceil(new Date().getTime()/1000))
      const payParams = {
        timeStamp: mchId,
        nonceStr,
        package:`prepay_id=${prepayId}`,
        signType: "MD5",
        paySign: sign,
      }
      console.log(payParams)
      return Taro.requestPayment(payParams);
    }).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    });
  }

  render() {
    const items = new Array(4).fill({});
    const { banner } = this.state;
    return (
      <PageView bgColor="#f7f7f7">
        <View className="b-home">
          <Button onClick={this.testPay.bind(this)}>测试支付</Button>
          <HomeBanner banner={banner} />
          <HomeNavigator items={items} />
          <HomeTitle title="人工智能指导" />
          <Image className="b-home-poster"></Image>
          <HomeTitle title="志愿填报服务" />
          <HomeServer />
        </View>
      </PageView>
    );
  }
}

export default Index;
