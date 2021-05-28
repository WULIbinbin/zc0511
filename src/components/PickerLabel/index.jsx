import { useCallback, useState } from "react";
import { View, Image } from "@tarojs/components";
import "./index.scss";

import SelectNorIcon from "../../static/image/select.png";
import SelectSelIcon from "../../static/image/select-sel.png";

function PickerLabel({
  placeHolder = "请选择",
  value = "",
  onShow = false,
  onChange = null,
}) {
  const handleClick = useCallback(() => {
    onChange && onChange();
  });
  return (
    <View className="b-picker-view" onClick={handleClick}>
      <View className={`label ${onShow && "on-show"}`}>
        {value || placeHolder}
      </View>
      <Image
        className={`icon`}
        src={onShow ? SelectSelIcon : SelectNorIcon}
      ></Image>
    </View>
  );
}

export default PickerLabel;
