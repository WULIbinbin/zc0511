import { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { Tabbar } from "../../../components/index";
import "./index.scss";
import ArrowLeft from "../../../static/image/arrow-left.png";
const tabs = ["推广明细", "分成明细"];

@inject("store")
@observer
class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { statusBarHeight, model } = wx.getSystemInfoSync();
    const isIos = model.indexOf("iPhone") > -1;
    const statusBarStyle = {
      marginTop: statusBarHeight + "PX",
      height: statusBarHeight + (isIos ? 0 : 46) + "PX",
    };
    return (
      <View className="b-income-page">
        <View className="b-income-bg"></View>
        <View className="b-income-topic">
          <View className="b-income-topic-title" style={statusBarStyle}>
            <Image
              className="b-navigate-back"
              src={ArrowLeft}
              onClick={() => {
                Taro.navigateBack();
              }}
            ></Image>
            我的收益
          </View>
          <View className="b-income-topic-desc">累计收益（元）</View>
          <View className="b-income-topic-money">528.50</View>
          <View className="b-income-topic-withdraw">提现</View>
        </View>
        <View className="b-income-middle">
          <View className="b-income-middle-item">
            <View className="b-income-middle-money">160.00</View>
            <View className="b-income-middle-desc">推广收益</View>
          </View>
          <View className="b-income-middle-item">
            <View className="b-income-middle-money">0.00</View>
            <View className="b-income-middle-desc">分成收益</View>
          </View>
        </View>
        <View className="b-income-bottom">
          <View className="b-income-bottom-bar b-bottom-line">
            <Tabbar tabs={tabs} activeTab={tabs[0]} />
          </View>
          <View className="b-income-bottom-list">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <View className="b-income-bottom-item b-bottom-line">
                <Image className="b-income-bottom-avatar"></Image>
                <View className="b-income-bottom-info">
                  <View className="b-income-bottom-name">这里是用户名</View>
                  <View className="b-income-bottom-date">2021.05.20</View>
                </View>
                <View className="b-income-bottom-money">开通vip+99元</View>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }
}

export default Index;
