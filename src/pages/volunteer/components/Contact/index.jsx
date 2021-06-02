import { View, Input } from "@tarojs/components";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { FormItem } from "../../../../components/index";
import { inject, observer } from "mobx-react";

import "./index.scss";

function Comp({ tel = "", wx = "", store, onChange = null,onSubmit=null }) {
  const [formData, setFormData] = useState({
    wx: wx,
    tel: tel,
  });

  // const handleChange = useCallback(
  //   (key, e) => {
  //     const { value } = e.detail;
  //     if (key === "tel" && value.length > 11) {
  //       return;
  //     }
  //     console.log(formData)
  //     setFormData({
  //       ...formData,
  //       [key]: e.detail.value,
  //     });
  //     onChange && onChange(formData);
  //   },
  //   [formData]
  // );
  const handleChange = (key, e) => {
    const { value } = e.detail;
    if (key === "tel" && value.length > 11) {
      return;
    }
    setFormData({
      ...formData,
      [key]: e.detail.value,
    });
    //onChange && onChange(formData);
  };

  const handleSubmit =()=>{
    onSubmit&&onSubmit(formData)
  }

  useEffect(() => {
    setFormData({
      wx: wx,
      tel: tel,
    });
  }, [wx, tel]);

  return (
    <>
      <View className="b-vol-contact">
        <View className="b-vol-contact-top b-bottom-line">
          <View className="b-vol-contact-title">联系方式</View>
          <View className="b-vol-contact-desc">专家审核需留下联系方式</View>
        </View>
        <View className="b-vol-contact-content">
          <FormItem label="微信：">
            <Input
              className="b-form-input"
              value={formData.wx}
              onInput={(e) => {
                handleChange("wx", e);
              }}
              onConfirm={(e) => {
                handleSubmit();
              }}
              onBlur={(e) => {
                handleSubmit();
              }}
              placeholder="输入微信账号"
            ></Input>
          </FormItem>
          <FormItem label="手机：">
            <Input
              className="b-form-input"
              type="number"
              value={formData.tel}
              maxlength={11}
              onInput={(e) => {
                handleChange("tel", e);
              }}
              onConfirm={(e) => {
                handleSubmit();
              }}
              onBlur={(e) => {
                handleSubmit();
              }}
              placeholder="请输入11位手机号码"
            ></Input>
          </FormItem>
        </View>
      </View>
    </>
  );
}
export default inject("store")(observer(Comp));
