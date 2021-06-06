import { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Image, Button } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { Tabbar } from "../../../components/index";
import "./index.scss";
import { GetShare, GetCode } from "../../../request/apis/recommend";
import { getConfig } from "../../../request/index";
import BannerPng from "../image/banner.png";
import QrcodePng from "../image/erweima.png";
import SharePng from "../image/fenxiang.png";

import ClosePng from "../../../static/image/close-gray.png";

@inject("store")
@observer
class Index extends Component {
  state = {
    list: [],
    code: "",
    showCode: false,
  };
  componentWillMount() {
    Taro.showLoading({title:'加载中'});
  }

  componentDidMount() {
    GetShare().then((res) => {
      Taro.hideLoading();
      this.setState({
        list: res.data || [],
      });
    });
    const { baseUrl } = getConfig();
    GetCode().then((res) => {
      this.setState({
        code: decodeURIComponent(
          `${baseUrl}/upload${res.data.replace(/\\/g, "/")}`
        ),
      });
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleGetCode(showCode) {
    this.setState({
      showCode,
    });
  }

  handlePreivew(){
    Taro.previewImage({
      urls:[this.state.code]
    })
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
    const { showCode, code, list } = this.state;
    return (
      <View className="b-rem-apply-page">
        <Image
          className="b-rem-apply-banner"
          mode="widthFix"
          src={BannerPng}
        ></Image>
        <View className="b-rem-apply-options">
          <View
            className="b-rem-apply-optiem"
            onClick={this.handleGetCode.bind(this, true)}
          >
            <Image className="b-rem-apply-optiem-icon" src={QrcodePng}></Image>
            <View className="b-rem-apply-optiem-text">生成推荐码</View>
          </View>
          <Button openType="share" className="b-rem-apply-optiem">
            <Image className="b-rem-apply-optiem-icon" src={SharePng}></Image>
            <View className="b-rem-apply-optiem-text">分享推荐</View>
          </Button>
        </View>
        <View className="b-rem-apply-list">
          <View className="b-rem-apply-list-title">我的推荐官</View>
          {list.map((item) => (
            <View className="b-rem-apply-list-item b-top-line">
              <Image
                className="b-rem-apply-list-icon"
                src={item.headImgUrl}
              ></Image>
              <View className="b-rem-apply-list-info">
                <View className="b-rem-apply-list-name">{item.nickname}</View>
                <View className="b-rem-apply-list-date">{item.createTime}</View>
              </View>
              <View className="b-rem-apply-list-status">
                {["审核中", "已申请", "审核失败"][item.status]}
              </View>
            </View>
          ))}
        </View>
        {showCode && (
          <View className="b-payment-dialog">
            <View className="b-payment-dialog-body">
              <View className="b-payment-dialog-main">
                <Image
                  className="b-payment-dialog-close-icon"
                  src={ClosePng}
                  onClick={this.handleGetCode.bind(this, false)}
                ></Image>
                <View className="b-payment-dialog-content">
                  <Image
                    mode="widthFix"
                    className="b-rem-apply-qrcode"
                    src={code}
                    onClick={this.handlePreivew.bind(this)}
                  ></Image>
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
