import { View, Image } from "@tarojs/components";
import { useCallback, useState } from "react";
import "./index.scss";

import SelectNor from "../../../../static/image/select.png";
import SelectSel from "../../../../static/image/select-sel.png";

export default function ({ echart = null }) {
  const [folded, setFold] = useState(false);
  const detailTabs = ["艺术型（A）", "企业型（E）", "艺术型（C）"];
  return (
    <View className="b-vol-modal">
      <View className="b-vol-modal-options">
        <View className="b-underline-title">霍兰德职业模型</View>
        <Image className="b-vol-modal-edit"></Image>
      </View>
      <View className="b-vol-modal-content">
        <View className="b-vol-modal-chart-title">
          职业兴趣测试结果显示您的类型属于
        </View>
        <View className="b-vol-modal-chart-desc">
          <View className="b-vol-modal-chart-code">A E C</View>
          <View className="b-vol-modal-chart-value">艺术/企业/传统</View>
        </View>
        <View className="b-vol-modal-chart-view">{echart}</View>
        <View className="b-vol-modal-chart-type">主导型：艺术型（A）</View>
        <View className="b-vol-modal-chart-type-desc">
          霍兰德所划分的六大类型:研究型（I）艺术型（A）社会型（S）企业型（E）传统型（C）现实型（R）并非是并列的，有着明晰的边界的。他以六边形标示出六大类型的相邻相隔、相对关系对应不同的性格特征。
        </View>
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
              <View className="b-vol-modal-detail-tab-item">{n}</View>
            ))}
          </View>
          
        </View>
      )}
    </View>
  );
}
