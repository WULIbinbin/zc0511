import { View, Image } from "@tarojs/components";
import { Table } from "../../../../components/index";
import Taro from "@tarojs/taro";
import MidTitle from "../MidTitle";
import { setEmptyKey } from "../../../../utils/tool";

import "./index.scss";

export default function ({
  showIcon = true,
  showMidTitle = true,
  batch = "本科批",
  data = [],
  showData = true,
  todo = "",
  school = [],
  college = [],
}) {
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

  const goto = () => {
    todo &&
      Taro.navigateTo({
        url: todo,
      });
  };
  const mapSchool = setEmptyKey(
    [...school].map((item) => {
      return {
        ...item,
        adjust: item.adjust ? "是" : "否",
      };
    })
  );
  const mapCollege = setEmptyKey(
    [...college].map((item) => {
      return {
        ...item,
        adjust: item.adjust ? "是" : "否",
      };
    })
  );
  return (
    <View className="b-vol-table">
      <View className="b-vol-table-main">
        {showMidTitle && (
          <MidTitle title="志愿填报信息" showIcon={showIcon} goEdit={goto} />
        )}
        <View className="b-vol-table-content">
          {school.length > 0 && (
            <>
              <View className="b-vol-table-title">本科批</View>
              <Table thead={thead} tbody={mapSchool}></Table>
            </>
          )}
          {college.length > 0 && (
            <>
              <View className="b-vol-table-title">高职专科批</View>
              <Table thead={thead} tbody={mapCollege}></Table>
            </>
          )}
          {school.length === 0 && college.length === 0 && (
            <View className="b-vol-comp-no-data">
              <View className="b-vol-comp-no-data-desc">
                添加后推荐与课程偏好相关专业
              </View>
              <View className="b-vol-comp-no-data-btn" onClick={goto}>
                立即添加
              </View>
            </View>
          )}
        </View>
      </View>
      {/* <View className="b-vol-table-chance">还有2次智能审核机会</View>
      <View className="b-vol-table-btn">提交审核</View> */}
    </View>
  );
}
