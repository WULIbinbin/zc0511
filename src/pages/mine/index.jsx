import { Component } from "react";
import { View, Image } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { UserProfile, PageView, Card } from "../../components/index";
import Taro from "@tarojs/taro";
import "./index.scss";
import VipBanner from "../../static/image/vip-banner.png";
import IconSave from "../../static/image/save.png";
import IconUniversity from "../../static/image/university.png";
import IconReport from "../../static/image/report.png";
import IconVip from "../../static/image/vip-icon.png";

@inject("store")
@observer
class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleCopy() {
    Taro.setClipboardData({
      data: "szcy_666",
    }).then(() => {
      Taro.showToast({
        title: "复制成功",
        icon: "none",
      });
    });
  }

  handleTo(url) {
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
      })
      return;
    }
    Taro.navigateTo({ url });
  }

  render() {
    const {
      Account: { studentInfo, subjectInfo },
      Common: { zxCity },
    } = this.props.store;
    const numbers = [
      {
        num: 0,
        label: "我的推荐",
        link: "/pages/recommend/index/index",
      },
      {
        num: 0,
        label: "我的收益",
        link: "/pages/user/income/index",
      },
    ];
    const enter1 = {
      text: "适合大学",
      num: 99,
      icon: IconUniversity,
      link: "/pages/befit/index/index",
    };
    const enter2 = {
      text: "我的报告",
      num: studentInfo.report,
      icon: IconReport,
      link: "/pages/vip/report/index",
    };

    const infos = [
      {
        label: "成绩:",
        info: [studentInfo.score],
      },
      {
        label: "科类:",
        info: subjectInfo.map((s) => s.subject),
      },
      {
        label: "学籍:",
        info: (function () {
          if (zxCity.includes(studentInfo.province)) {
            return [studentInfo.province];
          } else {
            return [studentInfo.province + studentInfo.city];
          }
        })(),
      },
    ];
    return (
      <PageView bgColor="#f7f7f7">
        <View className="b-mine">
          <View className="b-mine-top">
            <UserProfile phone={studentInfo.tel} isVip={!!studentInfo.vip} />
            <View className="b-mine-numbers">
              {numbers.map((n, i) => (
                <View
                  onClick={this.handleTo.bind(this, n.link)}
                  className={["items", i === 0 && "b-right-line"]}
                >
                  <View className="num">{n.num}</View>
                  <View className="label">{n.label}</View>
                </View>
              ))}
            </View>

            {!studentInfo.vip && (
              <View className="b-mine-vip-banner">
                <Image
                  onClick={this.handleTo.bind(this, "/pages/vip/guide/index")}
                  className="vip-banner"
                  src={VipBanner}
                  mode="widthFix"
                ></Image>
              </View>
            )}
          </View>
          <View className="b-mine-bottom">
            {!studentInfo.vip && (
              <Card
                label="会员卡绑定"
                icon={IconVip}
                accessTo={this.handleTo.bind(this, "/pages/vip/bind/index")}
              />
            )}
            <Card
              label="录入信息"
              icon={IconSave}
              accessTo={this.handleTo.bind(this, "/pages/user/record/index")}
            >
              {studentInfo.province && (
                <View className="b-mine-information">
                  {infos.map((la) => (
                    <View className="info-item">
                      <View className="label">{la.label}</View>
                      {la.info.length &&
                        la.info.map((items) => (
                          <View className="items">{items}</View>
                        ))}
                    </View>
                  ))}
                </View>
              )}
            </Card>

            {subjectInfo && subjectInfo.length > 0 && (
              <View className="b-mine-twice-enter">
                <View
                  className="enter-item"
                  onClick={this.handleTo.bind(this, enter1.link)}
                >
                  <View className="num">
                    {enter1.num}
                    <View className="plus">+</View>
                  </View>
                  <View className="label">
                    <Image className="icon" src={enter1.icon}></Image>
                    <View className="text">{enter1.text}</View>
                  </View>
                </View>
                <View
                  className="enter-item"
                  onClick={this.handleTo.bind(this, enter2.link)}
                >
                  <View className="num">{enter2.num}</View>
                  <View className="label">
                    <Image className="icon" src={enter2.icon}></Image>
                    <View className="text">{enter2.text}</View>
                  </View>
                </View>
              </View>
            )}
          </View>

          <View className="b-mine-contact" onClick={this.handleCopy.bind(this)}>
            联系我们：szcy_666<View className="copy">复制</View>
          </View>
        </View>
      </PageView>
    );
  }
}

export default Index;
