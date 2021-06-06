import { Component } from "react";
import { View, Image } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { GetOrderList } from "../../../request/apis/report";
import Taro from "@tarojs/taro";
import "./index.scss";

import Recommend from "../../../static/image/tianbao.png";
import Review from "../../../static/image/review.png";
import ArrowRight from "../../../static/image/arrow-right.png";

@inject("store")
@observer
class Index extends Component {
  state = {
    list: [],
  };
  componentWillMount() {}

  componentDidMount() {
    GetOrderList(1).then((res1) => {
      const list =
        (res1.data &&
          res1.data.map((n) => {
            return {
              ...n,
              type: n.type == 1 ? "recommend" : "review",
              title: n.type == 1 ? "志愿填报推荐" : "志愿审核报告",
              link:
                n.type == 1
                  ? `/pages/volunteer/tutorDetail/index?id=${n.id}`
                  : `/pages/volunteer/reviewDetail/index?id=${n.id}`,
            };
          })) ||
        [];
      this.setState({
        list,
      });
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { list } = this.state;
    return (
      <View className="b-vip-report-page">
        {list.length>0&&list.map((item) => (
          <View
            className="b-vip-report-item"
            onClick={() => {
              Taro.navigateTo({
                url: item.link,
              });
            }}
          >
            <Image
              className="b-vip-report-item-icon"
              src={item.type === "review" ? Review : Recommend}
            ></Image>
            <View className="b-vip-report-item-info">
              <View className="b-vip-report-item-title">{item.title}</View>
              <View className="b-vip-report-item-order">{item.num}</View>
            </View>
            <Image
              className="b-vip-report-item-access"
              src={ArrowRight}
            ></Image>
          </View>
        ))}
        {
          list.length===0&&<View className='b-vip-report-nodata'>暂无报告</View>
        }
      </View>
    );
  }
}

export default Index;
