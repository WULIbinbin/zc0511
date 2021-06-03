import { View, Text } from "@tarojs/components";
import { inject, observer } from "mobx-react";
import { Table } from "../../../../components/index";
import { setEmptyKey } from "../../../../utils/tool";

import "./index.scss";

function Comp({ store }) {
  const {
    Review,
    Review: {
      isPay,
      orderData: { sortScore, sortList, memo, info },
    },
  } = store;

  if (isPay && info == null && sortList && sortList.length > 0) {
    const thead = [
      {
        key: "sort",
        name: "志愿",
      },
      {
        key: "code",
        name: "院校代码",
      },
      {
        key: "schoolName",
        name: "院校名称",
      },
      {
        key: "adjust",
        name: "是否服从调剂",
      },
    ];
    const mapSchool = setEmptyKey(
      [...sortList].map((item) => {
        return {
          ...item,
          adjust: item.adjust ? "是" : "否",
        };
      })
    );
    return (
      <>
        <View className="b-vol-report">
          <View className="b-vol-report-options b-bottom-line">
            <View className="b-vol-report-main-title">志愿审核报告</View>
            <View className="b-vol-report-sub-title">
              根据成绩信息与填报情况审核结果
            </View>
          </View>
          <View className="b-vol-report-content">
            <View className="b-vol-report-result-desc">
              您此次志愿审核结果评分为：
            </View>
            <View className="b-vol-report-result-num">{sortScore}</View>
          </View>
          <View className="b-vol-report-suggest">
            <View className="b-vol-report-suggest-title">审核建议</View>
            <View className="b-vol-report-suggest-desc">依据近几年分数</View>
          </View>
          <View className="b-vol-report-btn">{memo}</View>
          {/* <View className="b-vol-report-btn">冲刺院校可以再定分数高一点的学校</View>
      <View className="b-vol-report-btn">保底院校可以再定分数低一点的学校</View> */}
          <View className="b-vol-report-table b-top-line">
            <View className="b-vol-report-table-topdesc">
              仅从历年分数的⻆度来看，建议你志愿排序为：
            </View>
            <Table thead={thead} tbody={mapSchool} />
          </View>
        </View>
        <View className="b-vol-report-bottom-desc">
          如果需要根据院校所在城市、报考专业等进行综合分析；建
          议您使用创宇志愿VIP卡，或专家志愿审核，结合院校城市、
          报考专业进行综合分析。
        </View>
      </>
    );
  } else {
    return null;
  }
}

export default inject("store")(observer(Comp));
