import { View, Text, Input } from "@tarojs/components";
import { useCallback, useState } from "react";
import { inject, observer } from "mobx-react";
import Taro from "@tarojs/taro";
import { WxPay } from "../../../../request/apis/account";
import {
  GetOrderById,
  PreferenceSaveInfo,
} from "../../../../request/apis/report";
import VolContact from "../Contact";
import "./index.scss";

function Comp({ store }) {
  const {
    Review,
    Review: {
      isPay,
      orderData: { school, college, info },
    },
    Common,
  } = store;
  const [payType, setPayType] = useState(3);
  const [formData, setFormData] = useState({
    wx: "",
    tel: "",
  });
  const price = [
    {
      name: "专家审核",
      desc: "教育专家审核志愿配置",
      money: "99",
      exact: "1次提交机会",
      type: 3,
    },
    {
      name: "智能审核",
      desc: "大数据审核志愿配置",
      money: "69",
      exact: "1次提交机会",
      type: 4,
    },
  ];

  const handlePay = () => {
    if (school.length >= 10 || college.length >= 10) {
      if (Common.holland == null) {
        Taro.showToast({ title: "请先完成霍兰德职业模型", icon: "none" });
        return;
      }
      if (payType == 3 && info == null) {
        Taro.showToast({ title: "请先填写微信号码", icon: "none" });
        return;
      }
      WxPay(payType).then((res) => {
        console.log(res);
        PreferenceSaveInfo({ ...formData, id: res.data.id });
        Review.getReviewOrder();
        Review.getOrderStatus();
        GetOrderById(res.data.id).then((res) => {});
      });
    } else {
      Taro.showToast({ title: "请先完善志愿填报", icon: "none" });
    }
  };

  const handleContact = (data) => {
    setFormData(data);
  };
  return (
    <View className="b-vol-payment-view">
      {(!isPay || info == null) && <VolContact onChange={handleContact} />}
      {!isPay && (
        <>
          <View className="b-vol-payment">
            {price.map((n, i) => (
              <View
                className={`b-vol-payment-item ${
                  n.type === payType && "actived"
                }`}
                onClick={() => {
                  setPayType(n.type);
                }}
              >
                <View className="b-vol-payment-item-name">{n.name}</View>
                <View className="b-vol-payment-item-desc">{n.desc}</View>
                <View className="b-vol-payment-item-price">
                  <Text className="b-vol-payment-item-money">￥</Text>
                  {n.money}
                </View>
                <View className="b-vol-payment-item-exact">{n.exact}</View>
              </View>
            ))}
          </View>
          <View className="b-vol-payment-btn" onClick={handlePay}>
            立即支付
          </View>
        </>
      )}
      {isPay && (
        <>
          <View className="b-vol-payment-chance">您有一次人工审核机会</View>
        </>
      )}
    </View>
  );
}
export default inject("store")(observer(Comp));
