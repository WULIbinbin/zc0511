import { View, Image } from "@tarojs/components";
import { useCallback, useEffect, useRef, useState } from "react";
import { EChart } from "echarts-taro3-react";
import MidTitle from "../MidTitle";

import "./index.scss";

import SelectNor from "../../../../static/image/select.png";
import SelectSel from "../../../../static/image/select-sel.png";

export default function ({
  echart = null,
  showIcon = true,
  showMidTitle = true,
  data = [],
  showData = true,
  todo = "",
}) {
  const [folded, setFold] = useState(true);
  const gaugeChart = useRef(null);
  const defautOption = {
    radar: {
      radius: "65%",
      center: ["50%", "50%"],
      splitNumber: 3,
      name: {
        fontSize: 13,
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
          color: "rgba(234, 68, 56, 0.3)",
        },
      },
    ],
  };

  const detailTabs = ["艺术型（A）", "企业型（E）", "艺术型（C）"];
  const details = [
    {
      title: "基本特征",
      desc:
        "有创造力，乐于创造新颖、与众不同的成果，渴望表现自己的个性，实现自身的价值；做事理想化，追求完美，不重实际。具有一定的艺术才能和个性。善于表达、怀旧、心态较为复杂。",
    },
    {
      title: "典型职业",
      desc:
        "有创造力，乐于创造新颖、与众不同的成果，渴望表现自己的个性，实现自身的价值；做事理想化，追求完美，不重实际。具有一定的艺术才能和个性。善于表达、怀旧、心态较为复杂。",
    },
  ];
  const goto = () => {
    todo &&
      Taro.navigateTo({
        url: todo,
      });
  };
  useEffect(() => {
    gaugeChart.current && gaugeChart.current.refresh(defautOption);
  }, [gaugeChart.current]);
  return (
    <View className="b-vol-modal">
      <MidTitle title="霍兰德职业模型" showIcon={false} goEdit={goto} />
      {!showData && (
        <View className="b-vol-comp-no-data">
          <View className="b-vol-comp-no-data-desc">
            添加后推荐与课程偏好相关专业
          </View>
          <View className="b-vol-comp-no-data-btn" onClick={goto}>
            立即添加
          </View>
        </View>
      )}
      <View className="b-vol-modal-content">
        <View className="b-vol-modal-chart-title">
          职业兴趣测试结果显示您的类型属于
        </View>
        <View className="b-vol-modal-chart-desc">
          <View className="b-vol-modal-chart-code">A E C</View>
          <View className="b-vol-modal-chart-value">艺术/企业/传统</View>
        </View>
        <View className="b-vol-modal-chart-view">
          <EChart
            ref={gaugeChart}
            canvasId="leida-canvas"
            className="leida-canvas"
          />
        </View>
        <View className="b-vol-modal-chart-type">主导型：艺术型（A）</View>
        <View className="b-vol-modal-chart-type-desc">
          霍兰德所划分的六大类型:研究型（I）艺术型（A）社会型（S）企业型（E）传统型（C）现实型（R）并非是并列的，有着明晰的边界的。他以六边形标示出六大类型的相邻相隔、相对关系对应不同的性格特征。
        </View>
        <View className="b-vol-modal-unlock">
          <View className="b-vol-modal-unlock-text">解锁说明：</View>
          <View
            className="b-vol-modal-unlock-fold"
            onClick={() => {
              setFold(!folded);
            }}
          >
            <View className="b-vol-modal-unlock-text">展开</View>
            <Image
              className="b-vol-modal-unlock-fold-arrow"
              src={!folded ? SelectNor : SelectSel}
            ></Image>
          </View>
        </View>
        {folded && (
          <View className="b-vol-modal-content b-top-line">
            <View className="b-vol-modal-detail-tab">
              {detailTabs.map((n) => (
                <View
                  className={`b-vol-modal-detail-tab-item ${
                    n === "艺术型（A）" && "actived"
                  }`}
                >
                  {n}
                </View>
              ))}
            </View>
            <View className="b-vol-modal-detail-content">
              {details.map((n) => (
                <>
                  <View className="b-vol-modal-detail-title">{n.title}</View>
                  <View className="b-vol-modal-detail-desc">{n.desc}</View>
                </>
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
