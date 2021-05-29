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
import Taro from "@tarojs/taro";
import { FormItem, SelectLabel } from "../../../components/index";
import { PreferenceSearch, PreferenceSave } from "../../../request/apis/report";
import "./index.scss";

import PlusPng from "../image/plus.png";

const collegeItem = {
  sort: 1,
  code: "",
  schoolName: "",
  adjust: "否",
  type: 1,
};

const batchs = ["本科批", "高职专科批"];
const adjust = ["否", "是"];

@inject("store")
@observer
class Index extends Component {
  state = {
    actived: "本科批",
    school: [collegeItem],
    college: [],
  };

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleTabChange(actived) {
    this.setState({
      actived,
    });
  }

  gotoPreview() {
    const { school, college } = this.state;
    const { Report } = this.props.store;
    Report.setBatch({ school, college });
    Taro.navigateTo({
      url: "/pages/volunteer/batchInfo/index",
    });
  }

  handlePlus() {
    const { school, college, actived } = this.state;
    const newItem = { ...collegeItem };
    if (actived === "高职专科批") {
      newItem.type = 0;
      newItem.sort = college.length + 1;
      college.push(newItem);
    } else {
      newItem.type = 1;
      newItem.sort = school.length + 1;
      school.push(newItem);
    }
    this.setState({
      school,
      college,
    });
  }

  toSave() {
    const { school, college } = this.state;
    PreferenceSave(JSON.stringify([...school, ...college]))
      .then((res) => {
        if (res.status === 0) {
          Taro.showToast({ title: "保存成功", icon: "success" });
        } else {
          Taro.showToast({ title: "保存失败，请重试", icon: "none" });
        }
      })
      .catch((err) => {
        Taro.showToast({ title: "保存失败，请重试", icon: "none" });
      });
  }

  handleSubmit() {
    const { school, college } = this.state;
    if (school.findIndex((f) => !f.code || !f.schoolName) > -1) {
      Taro.showModal({
        title: "提示",
        content: "本科批存在未填写项",
        confirmText: "继续提交",
      }).then((res) => {
        if (res.confirm) {
          this.toSave();
        }
      });
      return;
    } else if (college.findIndex((f) => !f.code || !f.schoolName) > -1) {
      Taro.showModal({
        title: "提示",
        content: "高职专科批存在未填写项",
        confirmText: "继续提交",
      }).then((res) => {
        if (res.confirm) {
          this.toSave();
        }
      });
      return;
    }
    this.toSave();
  }

  handleChange(data, e) {
    let { value } = e.detail;
    const { key, index } = data;
    if (key === "code") {
      if (e.mpEvent.type === "confirm") {
        if (value.length === 5) {
          this.getSchoolByCode({ index, value });
        } else {
          Taro.showToast({ title: "请输入5位数字代码", icon: "none" });
          return;
        }
      } else {
        if (value.length === 5) {
          this.getSchoolByCode({ index, value });
        } else if (value.length > 5) {
          Taro.showToast({ title: "请输入5位数字代码", icon: "none" });
          return;
        }
      }
    } else if (key === "adjust") {
      value = adjust[value];
      this.setItemData({ index, data: { [key]: value } });
    }
  }

  getSchoolByCode({ index, value }) {
    PreferenceSearch(value)
      .then((res) => {
        console.log(res);
        if (!!res.data) {
          this.setItemData({
            data: {
              code: value,
              schoolName: res.data,
            },
            index,
          });
        } else {
          Taro.showToast({ title: "院校不存在，请重试", icon: "none" });
        }
      })
      .catch((err) => {
        Taro.showToast({ title: "院校代码错误，请重试", icon: "none" });
      });
  }

  setItemData({ index, data }) {
    const { school, college, actived } = this.state;
    if (actived === "高职专科批") {
      college.splice(index, 1, {
        ...college[index],
        ...data,
      });
    } else {
      school.splice(index, 1, {
        ...school[index],
        ...data,
      });
    }
    this.setState({
      school,
      college,
    });
  }

  render() {
    const { school, college, actived } = this.state;
    let items = school;
    if (actived === "高职专科批") {
      items = college;
    }
    return (
      <View className="b-vol-batch">
        <ScrollView scrollY className="b-vol-batch-main">
          <View className="b-vol-batch-type">
            <View className="b-vol-batch-type-title b-bottom-line">
              批次选择
            </View>
            <View className="b-vol-batch-type-content">
              {batchs.map((n) => (
                <View
                  className={`b-vol-batch-type-item ${
                    actived === n && "actived"
                  }`}
                  onClick={this.handleTabChange.bind(this, n)}
                >
                  {n}
                </View>
              ))}
            </View>
          </View>
          {items.map((item, index) => (
            <View className="b-vol-batch-item">
              <View className="b-vol-batch-item-title b-bottom-line">
                志愿{index + 1}
              </View>
              <View className="b-vol-batch-item-content">
                <FormItem labelWidth={200} label="院校代码：">
                  <Input
                    className="b-form-input"
                    value={item.code}
                    placeholder="输入院校代码"
                    onInput={this.handleChange.bind(this, {
                      key: "code",
                      index,
                    })}
                    onConfirm={this.handleChange.bind(this, {
                      key: "code",
                      index,
                    })}
                  ></Input>
                </FormItem>
                <FormItem labelWidth={200} label="学校名称：">
                  <Input
                    className="b-form-input"
                    value={item.schoolName}
                    disabled
                    placeholder="请先输入院校代码"
                  ></Input>
                </FormItem>
                <FormItem labelWidth={200} label="是否服从调解：">
                  <Picker
                    className="b-vol-batch-item-picker"
                    value={item.adjust === "是" ? 1 : 0}
                    range={adjust}
                    onChange={this.handleChange.bind(this, {
                      key: "adjust",
                      index,
                    })}
                  >
                    <SelectLabel value={item.adjust}></SelectLabel>
                  </Picker>
                </FormItem>
              </View>
            </View>
          ))}
          <View
            className="b-vol-batch-plus"
            onClick={this.handlePlus.bind(this)}
          >
            <Image src={PlusPng} className="b-vol-batch-plus-icon" />
            <Text>新增志愿</Text>
          </View>
        </ScrollView>
        <View className="b-vol-batch-btn-group">
          <View
            className="b-vol-batch-btn b-vol-batch-btn-default"
            onClick={this.gotoPreview.bind(this)}
          >
            预览
          </View>
          <View
            className="b-vol-batch-btn b-vol-batch-btn-submit"
            onClick={this.handleSubmit.bind(this)}
          >
            确定
          </View>
        </View>
      </View>
    );
  }
}

export default Index;
