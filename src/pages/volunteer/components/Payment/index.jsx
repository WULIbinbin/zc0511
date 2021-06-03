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
    Review: { orderStatus, orderData },
    Account: { studentInfo },
    Common,
  } = store;
  const [payType, setPayType] = useState(null);
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
        Taro.showToast({ title: "请先填写联系方式", icon: "none" });
        return;
      }
      if (payType == 3 && !Common.phoneVerify(formData.tel)) {
        Taro.showToast({ title: "请填写正确手机号", icon: "none" });
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

  const handleContact = (data) => {
    console.log(data);
    setFormData(data);
  };
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
    setPayType(orderStatus.type || 3);
    if (!!orderData.info) {
      setFormData({
        wx: orderData.info.wx,
        tel: orderData.info.tel,
      });
    }
  }, [orderStatus, orderData]);

  return (
    <View className="b-vol-payment-view">
      {/* 选择支付方式 */}
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
      {/* 显示联系方式 */}
      {payType == 3 && (
        <>
          <VolContact {...formData} onSubmit={handleContact} />
          {orderData.info && (
            <View className="b-vol-payment-reviewed">
              已提交，稍后会有教育专家联系
            </View>
          )}
        </>
      )}
      {/* 专家审核支付显示 */}
      {payType == 3 && orderStatus.report.payStatus == false && (
        <View className="b-vol-payment-btn" onClick={handlePay}>
          立即支付
        </View>
      )}
      {/* 智能审核支付显示 */}
      {payType == 4 &&
        orderStatus.isNeedPay == true &&
        orderStatus.report.payStatus == false && (
          <View className="b-vol-payment-btn" onClick={handlePay}>
            立即支付
          </View>
        )}
      {/* 智能审核免费提交机会   */}
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
