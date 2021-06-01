import { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { Tabbar } from "../../../components/index";
import "./index.scss";
import BannerPng from "../image/banner.png";
import QrcodePng from "../image/erweima.png";
import SharePng from "../image/fenxiang.png";

@inject("store")
@observer
class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="b-rem-apply-page">
        <Image
          className="b-rem-apply-banner"
          mode="widthFix"
          src={BannerPng}
        ></Image>
        <View className="b-rem-apply-options">
          <View className="b-rem-apply-optiem">
            <Image className="b-rem-apply-optiem-icon" src={QrcodePng}></Image>
            <View className="b-rem-apply-optiem-text">生成推荐码</View>
          </View>
          <View className="b-rem-apply-optiem">
            <Image className="b-rem-apply-optiem-icon" src={SharePng}></Image>
            <View className="b-rem-apply-optiem-text">分享推荐</View>
          </View>
        </View>
        <View className="b-rem-apply-list">
          <View className="b-rem-apply-list-title">我的推荐官</View>
          <View className="b-rem-apply-list-item b-top-line">
            <Image className="b-rem-apply-list-icon"></Image>
            <View className="b-rem-apply-list-info">
              <View className="b-rem-apply-list-name">这里是用户名</View>
              <View className="b-rem-apply-list-date">2021.05.20</View>
            </View>
            <View className="b-rem-apply-list-status">已申请</View>
          </View>
        </View>
      </View>
    );
  }
}

export default Index;
