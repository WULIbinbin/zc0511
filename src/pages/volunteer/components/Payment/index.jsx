import { View, Text,Input } from "@tarojs/components";
import {FormItem} from '../../../../components/index'
import "./index.scss";

export default function ({}) {
  const price = [
    {
      name: "专家审核",
      desc: "教育专家审核志愿配置",
      money: "99",
      exact: "3次提交机会",
    },
    {
      name: "智能审核",
      desc: "大数据审核志愿配置",
      money: "69",
      exact: "3次提交机会",
    },
  ];
  return (
    <View className="b-vol-payment-view">
      <View className="b-vol-payment">
        {price.map((n, i) => (
          <View className={`b-vol-payment-item ${i === 0 && "actived"}`}>
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
      <View className="b-vol-contact">
        <View className="b-vol-contact-top b-bottom-line">
          <View className="b-vol-contact-title">联系方式</View>
          <View className="b-vol-contact-desc">专家审核需留下联系方式</View>
        </View>
        <View className="b-vol-contact-content">
          <FormItem label='微信：'>
            <Input className='b-form-input' placeholder='输入微信账号'></Input>
          </FormItem>
          <FormItem label='手机：'>
            <Input className='b-form-input' placeholder='请输入11位手机号码'></Input>
          </FormItem>
        </View>
      </View>
      <View className='b-vol-payment-btn'>立即支付</View>
    </View>
  );
}
