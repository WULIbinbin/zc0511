import { Component } from "react";
import { View, Image, Picker, Input } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { SelectLabel, FormItem } from "../../../components/index";
import "./index.scss";

import SelectIcon from "../../../static/image/select.png";

@inject("store")
@observer
class Index extends Component {
  state = {
    checked: "个人信息",
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleStepChange(checked) {
    this.setState({
      checked,
    });
  }

  render() {
    const step = ["个人信息", "成绩信息"];
    const { checked } = this.state;
    const sex = [
      {
        text: "男",
      },
      {
        text: "女",
      },
    ];
    const first = [
      {
        text: "物理",
      },
      {
        text: "历史",
      },
    ];
    const second = [
      {
        text: "化学",
      },
      {
        text: "生物",
      },
      {
        text: "地理",
      },
      {
        text: "政治",
      },
    ];
    const scoreItem = [
      {
        label:'语文：',
        name:'语文',
      },
      {
        label:'数学：',
        name:'数学',
      },
      {
        label:'英语：',
        name:'英语',
      },
      {
        label:'物理：',
        name:'物理',
      },
      {
        label:'政治：',
        name:'政治',
      },
      {
        label:'生物：',
        name:'生物',
      },
    ];
    return (
      <View className="b-user-record">
        <View className="step-view">
          <View className="step-items">
            {step.map((n, i) => (
              <View
                className={`item ${n === checked && "checked"}`}
                onClick={this.handleStepChange.bind(this, n)}
              >
                <View className="index">{i + 1}</View>
                <View className="name">{n}</View>
              </View>
            ))}
          </View>
          <View className="step-content">
            {checked === "个人信息" && (
              <View className="main">
                <FormItem label="省份：">
                  <Picker>
                    <SelectLabel width={200} placeHolder="北京" />
                  </Picker>
                  <Picker style="margin-left:20rpx;">
                    <SelectLabel width={200} placeHolder="丰台区" />
                  </Picker>
                </FormItem>
                <FormItem label="姓名：">
                  <Input className="step-input" value="张三"></Input>
                </FormItem>
                <FormItem label="性别：">
                  {sex.map((n) => (
                    <View className="step-select-item">
                      <View className="step-select-item-text">{n.text}</View>
                    </View>
                  ))}
                </FormItem>
                <FormItem label="首选科目：">
                  {first.map((n) => (
                    <View className="step-select-item">
                      <View className="step-select-item-text">{n.text}</View>
                    </View>
                  ))}
                </FormItem>
                <FormItem label="次选科目：">
                  {second.map((n) => (
                    <View className="step-select-item">
                      <View className="step-select-item-text">{n.text}</View>
                    </View>
                  ))}
                </FormItem>
              </View>
            )}
            {checked === "成绩信息" && (
              <View className="main">
                {scoreItem.map((n) => (
                  <FormItem label={n.label}>
                    <Input className="step-input" value=""></Input>
                  </FormItem>
                ))}
              </View>
            )}
          </View>
        </View>
        {checked === "个人信息" && (
          <View className={`btn`}>
            <View className="text">下一步</View>
          </View>
        )}
        {checked === "成绩信息" && (
          <View className={`btn`}>
            <View className="text">确认</View>
          </View>
        )}
      </View>
    );
  }
}

export default Index;
