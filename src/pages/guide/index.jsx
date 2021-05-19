import { Component } from "react";
import { View,Image } from "@tarojs/components";
import { observer, inject } from "mobx-react";

import "./index.scss";

import Lock from "../../static/image/lock.png";

import Tuxing1 from "../../static/image/tuxing1-2.png";
import Tuxing2 from "../../static/image/tuxing2-2.png";
import Tuxing3 from "../../static/image/tuxing3-2.png";

@inject("store")
@observer
class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const guideItems = [
      {
        title: "志愿填报辅导",
        desc: "推荐最优院校最适合的专业",
        bg: Tuxing1,
      },
      {
        title: "志愿审核服务",
        desc: "分析所填的志愿方案",
        bg: Tuxing2,
      },
      {
        title: "志愿填报综合报告",
        desc: "形成全面分析报告",
        bg: Tuxing3,
      },
    ];
    return (
      <View className="b-guide-page">
        <View className="bg">
          {guideItems.map((n) => (
            <View className="server-item">
              <View className="content">
                <View className="right-top">
                  <Image className="lock" src={Lock}></Image>
                </View>
                <View className="title">{n.title}</View>
                <View className="desc">{n.desc}</View>
                <Image className="b-bg" mode="heightFix" src={n.bg}></Image>
              </View>
            </View>
          ))}
        </View>
        <View className='vip-btn'>
          <View className='text'>开通VIP 全面解锁</View>
        </View>
        <View className='example'>看看 示例报告</View>
      </View>
    );
  }
}

export default Index;
