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

import HomeBanner2Png from '../../static/image/home-banner2.png'

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

  gotoGuide(){
    Taro.navigateTo({
      url:'/pages/vip/guide/index'
    })
  }

  testPay() {
    WxPay(1)
      .then((res) => {
        
        console.log(res)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const items = new Array(4).fill({});
    const { banner } = this.state;
    return (
      <PageView bgColor="#f7f7f7">
        <View className="b-home">
          {/* <Button onClick={this.testPay.bind(this)}>测试支付</Button>
          <Button onClick={()=>{
            Taro.navigateTo({
              url:'/pages/login/index'
            })
          }}>重新登录</Button> */}
          <HomeBanner banner={banner} />
          <HomeNavigator items={items} />
          <HomeTitle title="人工智能指导" />
          <Image className="b-home-poster" src={HomeBanner2Png} onClick={this.gotoGuide}></Image>
          <HomeTitle title="志愿填报服务" />
          <HomeServer />
        </View>
      </PageView>
    );
  }
}

export default Index;
