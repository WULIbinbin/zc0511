import { Component } from "react";
import { View, ScrollView } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { PageView } from "../../../components/index";
import { EChart } from "echarts-taro3-react";
import {
  VolTitle,
  VolTestInfo,
  VolPreference,
  VolModal,
} from "../components/index";
import "./index.scss";

@inject("store")
@observer
class Index extends Component {
  gaugeChart = null;

  componentDidMount() {
    const defautOption = {
      radar: {
        radius: "65%",
        center: ["50%", "50%"],
        splitNumber: 3,
        name: {
          fontSize: 12,
        },
        axisLine: {
          show: true,
        },
        splitArea: {
          areaStyle: {
            color: "#fff",
          },
        },
        splitLine: {
          lineStyle: {
            color: "#ccc",
          },
        },
        indicator: [
          { name: "A艺术", max: 100, color: "#D0AC58" },
          { name: "S社会", max: 100, color: "#D0AC58" },
          { name: "R实际", max: 100, color: "#D0AC58" },
          { name: "I研究", max: 100, color: "#D0AC58" },
          { name: "E企业", max: 100, color: "#D0AC58" },
          { name: "C传统", max: 100, color: "#D0AC58" },
        ],
      },
      series: [
        {
          type: "radar",
          symbol: "circle",
          data: [
            {
              value: [100, 30, 60, 75, 50, 81],
            },
          ],
          lineStyle: {
            color: "transparent",
          },
          itemStyle: {
            color: "rgba(255, 102, 91, 1)",
          },
          areaStyle: {
            color: "rgba(234, 68, 56, 0.2)",
          },
        },
      ],
    };
    this.gaugeChart.refresh(defautOption);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="b-vol-page">
        <VolTitle title="志愿填报推荐" desc="报告单号：CYZY-0000001"></VolTitle>
        <VolTestInfo />
        <VolPreference />
        <VolModal
          echart={
            <EChart
              ref={(node) => {
                this.gaugeChart = node;
                return node;
              }}
              canvasId="leida-canvas"
              className="leida-canvas"
            />
          }
        ></VolModal>
        <View className="b-vol-page-bottom-desc">
          注：由于该理论1959年提出，有些职业在这几十年间发生了很大的变化，甚至已经消失，我们本着尊重全球性著名专家的原则，并未删除或更改，直接展示给测试者。
        </View>
        <View className="b-vol-page-button-group">
          <View className="b-vol-page-button b-vol-page-button-left">
            <View className="b-vol-page-button-money">￥</View>99.00
          </View>
          <View className="b-vol-page-button b-vol-page-button-right">
            单项解锁
          </View>
        </View>
        <View className='b-vol-page-bottom-example'>看看 示例报告</View>
      </View>
    );
  }
}

export default Index;
