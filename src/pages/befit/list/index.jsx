import { Component } from "react";
import { View, ScrollView, Image, Text } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { Tabbar, PickerSelect } from "../../../components/index";
import { getScrollViewHeight } from "../../../utils/tool";
import { GetMySchoolList } from "../../../request/apis/home";
import Taro from "@tarojs/taro";
import { WxPay } from "../../../request/apis/account";
import "./index.scss";
import { GetOrderById } from "../../../request/apis/report";

import ClosePng from "../../../static/image/close-gray.png";
import titlePng from "../../../static/image/tihsi.png";

const tabs = ["冲刺院校", "适中院校", "保底院校"];

@inject("store")
@observer
class Index extends Component {
  state = {
    activeTab: "",
    type: 1,
    currentData: [],
    params: {},
    isGetList: false,
    total: 0,
    showDialog: false,
  };
  pageSize = 20;
  pageNum = 1;
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {
    const {
      options: { type },
    } = getCurrentPages()[getCurrentPages().length - 1];
    console.log(tabs[type - 1]);
    this.setState(
      {
        type,
        activeTab: tabs[type - 1],
      },
      () => {
        this.getList(type);
      }
    );
  }

  componentDidHide() {}

  getList() {
    const { type } = this.state;
    Taro.showLoading({ title: "加载中" });
    let { params, currentData } = this.state;
    const { pageSize, pageNum } = this;
    GetMySchoolList(type, { ...params, pageNum, pageSize }).then((res) => {
      Taro.hideLoading();
      const { list, total } = res.data;
      if (list.length > 0) {
        currentData = currentData.concat(list);
      }
      this.setState({
        total,
        currentData,
        isGetList: true,
        showDialog: false,
      });
    });
  }

  addListData() {
    const { Account, Common } = this.props.store;
    console.log("是不是vip", !!Account.isVip);
    if (!Account.isVip) {
      if (!!Common.isReviewing) return;
      this.setState({
        showDialog: true,
      });
      return;
    }
    this.pageNum = this.pageNum + 1;
    this.getList();
  }

  handlePicker(data) {
    if (!data) return;
    const params = {};

    if (data["地区"]) {
      params.province = data["地区"].join(",");
    }
    if (data["类型"]) {
      params.category = data["类型"].join(",");
    }
    console.log(params);
    this.pageNum = 1;
    this.setState({ params, currentData: [], isGetList: false }, () => {
      this.getList();
    });
  }

  handleTabChange(e) {
    this.setState(
      {
        activeTab: e.target,
        currentData: [],
        params: {},
        type: e.index + 1,
        total: 0,
        isGetList: false,
      },
      () => {
        this.pageNum = 1;
        this.getList();
      }
    );
  }

  collegeItem(n, labels, type) {
    return (
      <View
        className="b-befit-list-item"
        onClick={() => {
          Taro.navigateTo({
            url: `/pages/college/detail/index?name=${n.college_name}`,
          });
        }}
      >
        <Image className="b-befit-list-item-left" src={n.cover_image}></Image>
        <View className="b-befit-list-item-mid">
          <View className="b-befit-list-item-name">{n.college_name}</View>
          <View className="b-befit-list-item-desc">{n.province}</View>
          <View className="b-befit-list-item-labels">
            {labels.map((l) => (
              <View className="b-befit-list-item-label">{l}</View>
            ))}
          </View>
        </View>
        {type == 1 && (
          <>
            <View className="b-befit-list-item-right">
              <View className="b-befit-list-item-precent">30%</View>
              <View className="b-befit-list-item-risk">风险极大</View>
            </View>
            <View className="b-befit-list-item-top-label">冲</View>
          </>
        )}
        {type == 2 && (
          <>
            <View className="b-befit-list-item-right">
              <View className="b-befit-list-item-precent">60%</View>
              <View className="b-befit-list-item-risk wen">风险适中</View>
            </View>
            <View className="b-befit-list-item-top-label wen">稳</View>
          </>
        )}
        {type == 3 && (
          <>
            <View className="b-befit-list-item-right">
              <View className="b-befit-list-item-precent">90%</View>
              <View className="b-befit-list-item-risk bao">风险适中</View>
            </View>
            <View className="b-befit-list-item-top-label bao">保</View>
          </>
        )}
      </View>
    );
  }

  handleToggle() {
    this.setState({
      showDialog: !this.state.showDialog,
    });
  }

  handlePayVip() {
    const { Tutor, Review, Account } = this.props.store;
    WxPay(1).then((res) => {
      console.log(res);
      GetOrderById(res.data.id).then((res) => {
        Account.GetUserInfo();
        Tutor.getOrderStatus();
        Review.getOrderStatus();
        this.pageSize = 20;
        const { activeTab, type } = this.state;
        this.handleTabChange({ target: activeTab, index: type - 1 });
      });
    });
  }

  render() {
    const {
      Common: { province, category },
    } = this.props.store;
    const {
      activeTab,
      currentData,
      type,
      total,
      showDialog,
      isGetList,
    } = this.state;
    const pickers = [
      {
        label: "地区",
        range: province,
      },
      {
        label: "类型",
        range: category,
      },
    ];
    const scrollViewHeight = getScrollViewHeight(180);
    console.log(activeTab);
    return (
      <View className="b-befit-list-page">
        <View className="b-befit-list-topbar">
          <Tabbar
            activeTab={activeTab}
            tabs={tabs}
            onChange={this.handleTabChange.bind(this)}
          />
        </View>
        <View className="b-befit-list-options">
          <View className="b-befit-list-selector">
            <View className="b-befit-list-length">共{total}所</View>
            <PickerSelect
              range={pickers}
              style={{ flex: 4 }}
              onChange={this.handlePicker.bind(this)}
            />
          </View>
        </View>
        <ScrollView
          scrollY
          className="b-befit-list-content"
          style={{ height: scrollViewHeight }}
          scrollWithAnimation
          onScrollToLower={this.addListData.bind(this)}
          lowerThreshold={100}
        >
          {currentData.length > 0 &&
            currentData.map((n) => {
              const labels = (n.college_category && [n.college_category]) || [];
              !!n.tag1 && labels.push("双一流");
              !!n.tag2 && labels.push("985");
              !!n.tag3 && labels.push("211");
              return this.collegeItem(n, labels, type);
            })}
          {isGetList && currentData.length === 0 && (
            <View className="b-befit-list-nodata">暂无结果</View>
          )}
        </ScrollView>
        {/* {activeTab === tabs[0] && (
          <ScrollView
            scrollY
            className="b-befit-list-content"
            style={{ height: scrollViewHeight }}
          >
            {currentData.map((n) => {
              const labels = (n.college_category && [n.college_category]) || [];
              !!n.tag1 && labels.push("双一流");
              !!n.tag2 && labels.push("985");
              !!n.tag3 && labels.push("211");
              return this.collegeItem(n, labels, type);
            })}
          </ScrollView>
        )}
        {activeTab === tabs[1] && (
          <ScrollView
            scrollY
            className="b-befit-list-content"
            style={{ height: scrollViewHeight }}
          >
            {currentData.map((n) => {
              const labels = (n.college_category && [n.college_category]) || [];
              !!n.tag1 && labels.push("双一流");
              !!n.tag2 && labels.push("985");
              !!n.tag3 && labels.push("211");
              return this.collegeItem(n, labels, type);
            })}
          </ScrollView>
        )}
        {activeTab === tabs[2] && (
          <ScrollView
            scrollY
            className="b-befit-list-content"
            style={{ height: scrollViewHeight }}
          >
            {currentData.map((n) => {
              const labels = (n.college_category && [n.college_category]) || [];
              !!n.tag1 && labels.push("双一流");
              !!n.tag2 && labels.push("985");
              !!n.tag3 && labels.push("211");
              return this.collegeItem(n, labels, type);
            })}
          </ScrollView> })*/}
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
                    ￥<Text className="b-payment-dialog-moneynum">299</Text>
                  </Text>
                  <Text className="b-payment-dialog-desc">
                    成为会员后可解锁更多权限
                  </Text>
                </View>
                <View
                  className="b-payment-dialog-btn"
                  onClick={this.handlePayVip.bind(this)}
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
