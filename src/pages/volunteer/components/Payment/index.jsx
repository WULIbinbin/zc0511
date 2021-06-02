import { View, Text, Input } from "@tarojs/components";
import { useCallback, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import Taro from "@tarojs/taro";
import { WxPay } from "../../../../request/apis/account";
import {
  GetOrderById,
  PreferenceSaveInfo,
  PayAudit,
} from "../../../../request/apis/report";
import VolContact from "../Contact";
import "./index.scss";

//微信支付：isNeedPay==true||report.payStatus==false
//免费一次支付：isNeedPay==false||report.payStatus==false
function Comp({ store }) {
  const {
    Review,
    Review: { orderStatus, orderData, isZNUse },
    Account: { studentInfo },
    Common
  } = store;
  const [payType, setPayType] = useState(orderStatus.type || 3);
  const [formData, setFormData] = useState({
    wx: "",
    tel: "",
  });
  const price = [
    {
      name: "专家审核",
      desc: "教育专家审核志愿配置",
      money: Common.professorPrice.value,
      exact: "",
      type: 3,
    },
    {
      name: "智能审核",
      desc: "大数据审核志愿配置",
      money: Common.aiPrice.value,
      exact: "1次提交机会",
      type: 4,
    },
  ];

  const handlePay = () => {
    if (orderData.school.length >= 10 || orderData.college.length >= 10) {
      if (payType == 3 && (formData.wx == "" || formData.tel == "")) {
        Taro.showToast({ title: "请先填写微信号码", icon: "none" });
        return;
      }
      WxPay(payType).then((res) => {
        console.log(res);
        Taro.showToast({ title: "支付成功", icon: "none" });
        PreferenceSaveInfo({ ...formData, id: res.data.id });
        GetOrderById(res.data.id).then((res) => {
          Review.getReviewOrder();
          Review.getOrderStatus();
        });
      });
    } else {
      Taro.showToast({ title: "请先完善志愿填报", icon: "none" });
    }
  };

  const handleContact = useCallback(
    (data) => {
      setFormData(data);
    },
    [formData]
  );
  const handlePayFree = () => {
    PayAudit().then((res) => {
      if (res.status == 0) {
        Taro.showToast({ title: "提交成功", icon: "none" });
      } else {
        Taro.showToast({ title: "提交成功", icon: "none" });
      }
    });
  };
  useEffect(() => {
    console.log(orderStatus, orderStatus.type, payType, isZNUse);
  }, [formData, orderStatus, orderData, payType]);

  return (
    <View className="b-vol-payment-view">
      {orderStatus.report.payStatus == false && (
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
      )}
      {payType == 3 && orderData.info == null && (
        <VolContact onChange={handleContact} />
      )}
      {/* (payType == 3 || (payType == 4 && isZNUse)) && */}
      {orderStatus.isNeedPay == true && orderStatus.report.payStatus == false && (
        <View className="b-vol-payment-btn" onClick={handlePay}>
          立即支付
        </View>
      )}
      {payType == 4 &&
        studentInfo.vip &&
        orderStatus.report.payStatus == false &&
        orderStatus.isNeedPay == false && (
          <>
            <View className="b-vol-payment-chance">您有一次智能审核机会</View>
            <View className="b-vol-payment-btn" onClick={handlePayFree}>
              立即提交
            </View>
          </>
        )}
    </View>
  );
}
export default inject("store")(observer(Comp));
