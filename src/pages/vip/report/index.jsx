import { Component } from "react";
import { View, Image } from "@tarojs/components";
import { observer, inject } from "mobx-react";

import "./index.scss";

import Recommend from "../../../static/image/tianbao.png";
import Review from "../../../static/image/review.png";
import ArrowRight from "../../../static/image/arrow-right.png";

@inject("store")
@observer
class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const list = [
      {
        title: "志愿填报推荐",
        type: "recommend",
        orderId: "报告单号：CYZY-0000001",
      },
      {
        title: "志愿审核报告",
        type: "review",
        orderId: "报告单号：CYZY-0000001",
      },
    ];
    return (
      <View className="b-vip-report-page">
        {list.map((item) => (
          <View className="b-vip-report-item">
            <Image
              className="b-vip-report-item-icon"
              src={item.type === "review" ? Review : Recommend}
            ></Image>
            <View className="b-vip-report-item-info">
              <View className="b-vip-report-item-title">{item.title}</View>
              <View className="b-vip-report-item-order">{item.orderId}</View>
            </View>
            <Image
              className="b-vip-report-item-access"
              src={ArrowRight}
            ></Image>
          </View>
        ))}
      </View>
    );
  }
}

export default Index;
