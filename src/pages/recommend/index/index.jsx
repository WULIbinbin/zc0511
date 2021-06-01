import { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Input } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { FormItem } from "../../../components/index";
import "./index.scss";

@inject("store")
@observer
class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="b-recommend-page">
        <View className="b-recommend-content">
          <View className="b-recommend-title">申请成为推荐官</View>
          <FormItem label="姓名:" labelWidth={80}>
            <Input className="b-recommend-input" type="number"></Input>
          </FormItem>
          <FormItem label="职业:" labelWidth={80}>
            <Input className="b-recommend-input" type="number"></Input>
          </FormItem>
          <FormItem label="手机:" labelWidth={80}>
            <Input className="b-recommend-input" type="number"></Input>
          </FormItem>
          <FormItem label="微信:" labelWidth={80}>
            <Input className="b-recommend-input" type="number"></Input>
          </FormItem>
          <View className="b-recommend-apply">立即申请</View>
        </View>
      </View>
    );
  }
}

export default Index;
