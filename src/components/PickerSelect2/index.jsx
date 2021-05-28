import { useCallback, useEffect, useState } from "react";
import { View, Image, ScrollView } from "@tarojs/components";
import PickerLabel from "../PickerLabel/index";
import "./index.scss";

import SelectIcon from "../../static/image/select.png";

function PickerSelect({
  placeHolder = "请选择",
  province,
  level,
  category,
  onChange = null,
}) {
  const pickers = [
    {
      label: "地区",
      range: province,
    },
    {
      label: "层次",
      range: level,
    },
    {
      label: "类型",
      range: category,
    },
  ];
  const defaultSelected = {
    地区: new Set(),
    层次: new Set(),
    类型: new Set(),
  };
  const [selected, setSelect] = useState(defaultSelected);
  const [currentShow, setPicker] = useState(-1);
  //刷新picker数组
  const [maps, setMaps] = useState([]);
  //当前选中的picker数据

  const showPicker = (whichShow) => {
    if (whichShow === currentShow) {
      setPicker(-1);
      return;
    }
    setPicker(whichShow);
    setMaps(pickers[whichShow].range);
    onChange && onChange();
  };

  const handleSelect = (sel) => {
    const newMaps = [...maps];
    const curPicker = pickers[currentShow].label;
    if (!selected[curPicker].has(sel)) {
      selected[curPicker].add(sel);
    } else {
      selected[curPicker].delete(sel);
    }
    setSelect(selected);
    setMaps(newMaps);
  };

  const handleReset = useCallback(() => {
    const newMaps = [...maps];
    setSelect(defaultSelected);
    setMaps(newMaps);
    //setPicker(-1);
  });

  const handleSubmit = useCallback(() => {
    console.log(selected);
    const mapSelected = () => {
      const result = {};
      Object.keys(selected).forEach((item) => {
        const ch = [];
        selected[item].forEach((child) => {
          ch.push(child);
        });
        result[item] = ch;
      });
      return result;
    };
    const selectedResult = mapSelected();
    console.log(selectedResult);
    setPicker(-1);
    onChange && onChange(selectedResult);
  });

  const { screenWidth } = wx.getSystemInfoSync();
  const selectViewStyle = { width: screenWidth + "PX" };
  return (
    <View className="b-picker-item">
      <View className="picker-group">
        {pickers.map((p, pdx) => (
          <PickerLabel
            value={p.label}
            onChange={() => {
              showPicker(pdx);
            }}
          />
        ))}
      </View>
      {currentShow >= 0 && (
        <View className="select-view" style={selectViewStyle}>
          <View className="select-content">
            <ScrollView scrollY className="select-wrap">
              <View className="select-items">
                {maps.map((item, idx) => (
                  <View
                    className={`item ${
                      selected[pickers[currentShow].label].has(item) &&
                      "selected"
                    }`}
                    onClick={() => {
                      handleSelect(item);
                    }}
                  >
                    {item}
                  </View>
                ))}
              </View>
            </ScrollView>
            <View className="btn-view">
              <View className="reset btn" onClick={handleReset}>
                重置
              </View>
              <View className="submit btn" onClick={handleSubmit}>
                确定
              </View>
            </View>
          </View>
          <View
            className="select-mark"
            // onClick={() => {
            //   setPicker(-1);
            //   setSelect(defaultSelected)
            // }}
          ></View>
        </View>
      )}
    </View>
  );
}

export default PickerSelect;
