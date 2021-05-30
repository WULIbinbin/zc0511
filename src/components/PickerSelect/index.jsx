import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { View, Image, ScrollView } from "@tarojs/components";
import PickerLabel from "../PickerLabel/index";
import { getScrollViewHeight } from "../../utils/tool";
import "./index.scss";

function PickerSelect({
  placeHolder = "请选择",
  style = {},
  range = [],
  onChange = null,
}) {
  const pickers = [...range];
  //设置默认选中
  const defaultSelected = (() => {
    const dataSet = {};
    if (pickers.length === 0) return dataSet;
    pickers.forEach((n) => {
      dataSet[n.label] = new Set();
    });
    return dataSet;
  })();
  const [selected, setSelect] = useState(defaultSelected);
  const [currentShow, setPicker] = useState(-1);
  const [compTop, setCompTop] = useState({});
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
  });

  const handleSubmit = useCallback(() => {
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

  useLayoutEffect(() => {
    const pickerDom = wx.createSelectorQuery();
    pickerDom
      .select("#b-picker-item-xjgatr")
      .fields(
        {
          size:true,
          rect: true,
          scrollOffset: true,
        },
        (res) => {
          if (res) {
            console.log(res)
            setCompTop(Math.floor(res.top+res.height));
          }
        }
      )
      .exec();
  });

  const { screenWidth } = wx.getSystemInfoSync();
  const selectViewStyle = { width: screenWidth + "PX" };
  const selectViewTop = compTop;
  return (
    <View
      className="b-picker-item"
      style={{ ...style }}
      id="b-picker-item-xjgatr"
    >
      <View className="picker-group">
        {pickers.map((p, pdx) => (
          <PickerLabel
            value={p.label}
            onShow={currentShow === pdx}
            onChange={() => {
              showPicker(pdx);
            }}
          />
        ))}
      </View>
      {currentShow >= 0 && (
        <View
          className="select-view"
          style={{ ...selectViewStyle, top: selectViewTop }}
        >
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
