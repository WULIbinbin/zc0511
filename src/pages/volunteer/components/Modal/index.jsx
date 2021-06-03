import { View, Image } from "@tarojs/components";
import { useCallback, useEffect, useRef, useState } from "react";
import { EChart } from "echarts-taro3-react";
import MidTitle from "../MidTitle";
import Taro from "@tarojs/taro";
import VolSubject from "../Subject";
import { inject, observer } from "mobx-react";

import "./index.scss";

import SelectNor from "../../../../static/image/select.png";
import SelectSel from "../../../../static/image/select-sel.png";

function Comp({ hideMajor = false, todo = "", showIcon = true, store }) {
  const {
    Tutor,
    Tutor: { hollandSubData, hollandTypeWord },
  } = store;
  const [folded, setFold] = useState(false);
  const [activeKey, setActiveKey] = useState("");
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
        { name: "A艺术", max: 10, color: "#D0AC58" },
        { name: "S社会", max: 10, color: "#D0AC58" },
        { name: "R实际", max: 10, color: "#D0AC58" },
        { name: "I研究", max: 10, color: "#D0AC58" },
        { name: "E企业", max: 10, color: "#D0AC58" },
        { name: "C传统", max: 10, color: "#D0AC58" },
      ],
    },
    series: [
      {
        type: "radar",
        symbol: "circle",
        data: [
          {
            value: [
              hollandSubData["A"],
              hollandSubData["S"],
              hollandSubData["R"],
              hollandSubData["I"],
              hollandSubData["E"],
              hollandSubData["C"],
            ],
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

  const detailTabs = [];
  const details = {};
  let mainKey = "";
  Tutor.hollandTypeList.forEach((item, i) => {
    const key = `${item.memo}(${item.cate})`;
    if (i === 0) {
      mainKey = key;
    }
    detailTabs.push(key);
    details[key] = item;
  });
  const goto = () => {
    todo &&
      Taro.navigateTo({
        url: todo,
      });
  };
  const handelTab = useCallback((tab) => {
    console.log(tab);
    setActiveKey(tab);
  }, []);
  useEffect(() => {
    setActiveKey(mainKey);
    gaugeChart.current && gaugeChart.current.refresh(defautOption);
  }, [gaugeChart.current,activeKey]);

  console.log(activeKey);
  return (
    <>
      <View className="b-vol-modal">
        <MidTitle title="霍兰德职业模型" showIcon={showIcon} goEdit={goto} />
        {Tutor.hollandTypeList.length === 0 ? (
          <View className="b-vol-comp-no-data">
            <View className="b-vol-comp-no-data-desc">
              添加后推荐与课程偏好相关专业
            </View>
            <View className="b-vol-comp-no-data-btn" onClick={goto}>
              立即添加
            </View>
          </View>
        ) : (
          <View className="b-vol-modal-content">
            <View className="b-vol-modal-chart-title">
              职业兴趣测试结果显示您的类型属于
            </View>
            <View className="b-vol-modal-chart-desc">
              <View className="b-vol-modal-chart-code">
                {hollandTypeWord.en}
              </View>
              <View className="b-vol-modal-chart-value">
                {hollandTypeWord.cn}
              </View>
            </View>
            <View className="b-vol-modal-chart-view">
              <EChart
                ref={gaugeChart}
                canvasId="leida-canvas"
                className="leida-canvas"
              />
            </View>
            <View className="b-vol-modal-chart-type">主导型：{mainKey}</View>
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
                        n === activeKey && "actived"
                      }`}
                      onClick={() => {
                        handelTab(n);
                      }}
                    >
                      {n}
                    </View>
                  ))}
                </View>
                <View className="b-vol-modal-detail-content">
                  {details[activeKey] && (
                    <>
                      <View className="b-vol-modal-detail-title">
                        {details[activeKey].info}
                      </View>
                      <View className="b-vol-modal-detail-desc">
                        {details[activeKey].work}
                      </View>
                    </>
                  )}
                </View>
              </View>
            )}
          </View>
        )}
      </View>
      {!hideMajor &&
        Tutor.hollandMajorList &&
        Tutor.hollandMajorList.length > 0 && (
          <>
            <View className="b-vol-page-bottom-desc">
              注：由于该理论1959年提出，有些职业在这几十年间发生了很大的变化，甚至已经消失，我们本着尊重全球性著名专家的原则，并未删除或更改，直接展示给测试者。
            </View>
            <VolSubject />
          </>
        )}
    </>
  );
}

export default inject("store")(observer(Comp));
