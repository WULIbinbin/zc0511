import { Component } from "react";
import { View, Image, Picker, Input } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { SelectLabel, FormItem } from "../../../components/index";
import "./index.scss";

import MaleNor from "../../../static/image/male-nor.png";
import MaleSel from "../../../static/image/male.png";
import FemaleNor from "../../../static/image/female-nor.png";
import femaleSel from "../../../static/image/female.png";

@inject("store")
@observer
class Index extends Component {
  state = {
    checked: "个人信息",
    formData: {
      province: "",
      name: "",
      sex: "",
      score: "",
      subList: [],
    },
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

  handleChangeProv(e) {
    console.log(e);
    const { Common } = this.props.store;
    const { formData } = this.state;
    formData.province = e.detail.value.join("-"); //Common.province[e.detail.value];
    this.setState({
      formData,
    });
  }

  handleInputName(e) {
    const { formData } = this.state;
    formData.name = e.detail.value;
    this.setState({ formData });
  }

  render() {
    const step = ["个人信息", "成绩信息"];
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
        label: "语文：",
        name: "语文",
      },
      {
        label: "数学：",
        name: "数学",
      },
      {
        label: "英语：",
        name: "英语",
      },
      {
        label: "物理：",
        name: "物理",
      },
      {
        label: "政治：",
        name: "政治",
      },
      {
        label: "生物：",
        name: "生物",
      },
    ];
    const { Common } = this.props.store;
    const { checked, formData } = this.state;
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
                <FormItem contentWidth={400} label="地区：">
                  <Picker
                    mode="region"
                    //range={Common.province}
                    value={formData.province}
                    onChange={this.handleChangeProv.bind(this)}
                  >
                    <View className="step-select-city">
                      <SelectLabel
                        placeHolder="请选择地区"
                        width={400}
                        value={formData.province}
                      />
                    </View>
                  </Picker>
                </FormItem>
                <FormItem label="姓名：">
                  <Input
                    className="b-form-input"
                    placeholder="输入您的姓名"
                    value={formData.name}
                    onInput={this.handleInputName.bind(this)}
                  ></Input>
                </FormItem>
                <FormItem label="性别：">
                  {sex.map((n) => (
                    <View className="step-select-item">
                      <View className="step-select-item-text">
                        {n.text === "男" && (
                          <Image
                            className="step-select-item-sex"
                            src={MaleNor}
                          ></Image>
                        )}
                        {n.text === "女" && (
                          <Image
                            className="step-select-item-sex"
                            src={FemaleNor}
                          ></Image>
                        )}
                        {n.text}
                      </View>
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
                    <Input className="b-form-input" value=""></Input>
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
