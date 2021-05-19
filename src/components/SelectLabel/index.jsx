import { useCallback, useState } from "react";
import { View, Image } from "@tarojs/components";
import "./index.scss";

import SelectIcon from "../../static/image/select.png";

function SelectLabel({
  label = "",
  placeHolder = "请选择",
  value = "",
  width = 480,
}) {
  return (
    <View className="b-select-view" style={{ width: `${width}rpx` }}>
      <View className="b-select-label">{label}</View>
      <View className="b-select-content">
        <View className={`b-select-value`}>{value || placeHolder}</View>
        <Image className={`b-select-icon`} src={SelectIcon}></Image>
      </View>
    </View>
  );
}

export default SelectLabel;
