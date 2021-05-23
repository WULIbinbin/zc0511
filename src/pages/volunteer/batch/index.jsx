import { Component } from "react";
import {
  View,
  Image,
  ScrollView,
  Input,
  Picker,
  Text,
} from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { FormItem, SelectLabel } from "../../../components/index";
import "./index.scss";

import PlusPng from "../image/plus.png";

@inject("store")
@observer
class Index extends Component {
  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const batchs = ["本科批", "高职专科批"];
    const items = new Array(10).fill({});
    return (
      <View className="b-vol-batch">
        <ScrollView scrollY className="b-vol-batch-main">
          <View className="b-vol-batch-type">
            <View className="b-vol-batch-type-title b-bottom-line">
              批次选择
            </View>
            <View className="b-vol-batch-type-content">
              {batchs.map((n) => (
                <View className="b-vol-batch-type-item">{n}</View>
              ))}
            </View>
          </View>
          {items.map((n) => (
            <View className="b-vol-batch-item">
              <View className="b-vol-batch-item-title b-bottom-line">
                志愿一
              </View>
              <View className="b-vol-batch-item-content">
                <FormItem labelWidth={200} label="院校代码：">
                  <Input
                    className="b-form-input"
                    placeholder="输入院校代码"
                  ></Input>
                </FormItem>
                <FormItem labelWidth={200} label="学校名称：">
                  <Input
                    className="b-form-input"
                    placeholder="输入院校代码"
                  ></Input>
                </FormItem>
                <FormItem labelWidth={200} label="是否服从调解：">
                  <Picker className="b-vol-batch-item-picker">
                    <SelectLabel value="否"></SelectLabel>
                  </Picker>
                </FormItem>
              </View>
            </View>
          ))}
          <View className="b-vol-batch-plus">
            <Image src={PlusPng} className="b-vol-batch-plus-icon" />
            <Text>新增志愿</Text>
          </View>
        </ScrollView>
        <View className="b-vol-batch-btn-group">
          <View className="b-vol-batch-btn b-vol-batch-btn-default">预览</View>
          <View className="b-vol-batch-btn b-vol-batch-btn-submit">确定</View>
        </View>
      </View>
    );
  }
}

export default Index;
