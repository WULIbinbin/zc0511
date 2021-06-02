import { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { Tabbar } from "../../../components/index";
import {
  GetIncomeByType,
  GetIncomeChange,
  IncomeWithDraw,
} from "../../../request/apis/recommend";
import "./index.scss";
import ArrowLeft from "../../../static/image/arrow-left.png";
const tabs = ["推广明细", "分成明细"];

@inject("store")
@observer
class Index extends Component {
  state = {
    activeTab: "推广明细",
    tg: [],
    tgi: "",
    fc: [],
    fci: "",
    balance: 0,
    freeze: 0,
  };
  componentWillMount() {}

  componentDidMount() {
    this.getData();
  }

  getData() {
    GetIncomeByType(0)
      .then((res1) => {
        return GetIncomeByType(1).then((res2) => {
          return Promise.resolve({
            tg: res1.data,
            fc: res2.data,
          });
        });
      })
      .then((res) => {
        console.log(res);
        this.setState({
          ...res,
          tgi: String(
            res.tg.reduce((total, cur) => {
              return Math.floor((total + cur.price) * 100) / 100;
            }, 0)
          ),
          fci: String(
            res.fc.reduce((total, cur) => {
              return Math.floor((total + cur.price) * 100) / 100;
            }, 0)
          ),
        });
      });
    GetIncomeChange().then((res) => {
      if (res.data == null) return;
      this.setState({
        balance: res.data.balance,
        freeze: res.data.freeze,
      });
    });
  }

  handleTab(activeTab) {
    console.log(activeTab);
    this.setState({
      activeTab,
    });
  }

  handleGetChange() {
    const { balance } = this.state;
    if (balance == 0) {
      Taro.showToast({
        title: "当前余额未零，无法提现",
        icon: "none",
      });
      return;
    }
    Taro.showModal({
      title: "提示",
      content: `确认提现${balance}元吗？`,
    }).then((m) => {
      if (m.confirm) {
        IncomeWithDraw()
          .then((res) => {
            if (res.status == 0) {
              Taro.showToast({ title: "申请提现成功", icon: "success" });
              this.getData();
            } else {
              Taro.showToast({
                title: res.data || "申请提现失败",
                icon: "none",
              });
            }
          })
          .catch((err) => {
            Taro.showToast({
              title: err.data || "申请提现失败",
              icon: "none",
            });
          });
      }
    });
  }

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
    const { tg, tgi, fc, fci, activeTab, balance, freeze } = this.state;
    console.log(this.state);
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
          <View className="b-income-topic-desc">余额(元)</View>
          <View className="b-income-topic-money">{balance}</View>
          {Number(freeze) > 0 && (
            <View className="b-income-topic-desc2">{freeze}元提现中</View>
          )}
          <View
            className="b-income-topic-withdraw"
            onClick={this.handleGetChange.bind(this)}
          >
            提现
          </View>
          <View className='b-income-topic-desc2'>提现到绑定的手机号和微信号</View>
        </View>
        <View className="b-income-middle">
          <View className="b-income-middle-item">
            <View className="b-income-middle-money">{tgi}</View>
            <View className="b-income-middle-desc">推广收益</View>
          </View>
          <View className="b-income-middle-item">
            <View className="b-income-middle-money">{fci}</View>
            <View className="b-income-middle-desc">分成收益</View>
          </View>
        </View>
        <View className="b-income-bottom">
          <View className="b-income-bottom-bar b-bottom-line">
            <Tabbar
              tabs={tabs}
              activeTab={activeTab}
              onChange={({ target }) => {
                this.handleTab(target);
              }}
            />
          </View>
          {activeTab == "推广明细" ? (
            <View className="b-income-bottom-list">
              {tg.map((item) => (
                <View className="b-income-bottom-item b-bottom-line">
                  <Image
                    className="b-income-bottom-avatar"
                    src={item.headImgUrl}
                  ></Image>
                  <View className="b-income-bottom-info">
                    <View className="b-income-bottom-name">
                      {item.nickname}
                    </View>
                    <View className="b-income-bottom-date">
                      {item.createTime}
                    </View>
                  </View>
                  <View className="b-income-bottom-money">
                    {item.memo}+{item.price}元
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View className="b-income-bottom-list">
              {fc.map((item) => (
                <View className="b-income-bottom-item b-bottom-line">
                  <Image
                    className="b-income-bottom-avatar"
                    src={item.headImgUrl}
                  ></Image>
                  <View className="b-income-bottom-info">
                    <View className="b-income-bottom-name">
                      {item.nickname}
                    </View>
                    <View className="b-income-bottom-date">
                      {item.createTime}
                    </View>
                  </View>
                  <View className="b-income-bottom-money">
                    {item.memo}+{item.price}元
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default Index;
