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
import {
  PreferenceSearch,
  PreferenceSave,
  PreferenceList,
} from "../../../request/apis/report";
import "./index.scss";

import PlusPng from "../image/plus.png";

const collegeItem = {
  sort: 1,
  code: "",
  schoolName: "",
  adjust: false,
  type: 1,
};

const batchs = ["本科批", "高职专科批"];
const adjust = [
  { name: "否", value: false },
  { name: "是", value: true },
];

@inject("store")
@observer
class Index extends Component {
  state = {
    actived: "本科批",
    // school: [collegeItem],
    // college: [],
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
    Taro.navigateTo({
      url: "/pages/volunteer/batchInfo/index",
    });
  }

  handlePlus() {
    const { actived } = this.state;
    const {
      Review,
      Review: {
        batch: { school, college },
      },
    } = this.props.store;
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
    Review.setBatch({ school, college });
  }

  toSave() {
    const {
      Review: {
        batch: { school, college },
      },
    } = this.props.store;
    const { actived } = this.state;
    PreferenceSave(
      JSON.stringify(actived === "本科批" ? [...school] : [...college])
    )
      .then((res) => {
        if (res.status === 0) {
          Taro.showToast({ title: "保存成功", icon: "success" });
          Taro.navigateBack();
        } else {
          Taro.showToast({ title: "保存失败，请重试", icon: "none" });
        }
      })
      .catch((err) => {
        Taro.showToast({ title: "保存失败，请重试", icon: "none" });
      });
  }

  isRepeat(data = []) {
    const check = {};
    data.forEach((item) => {
      if (check[item.schoolName] === undefined) {
        check[item.schoolName] = 1;
      } else {
        check[item.schoolName] += 1;
      }
    });
    return Object.keys(check).findIndex((f) => check[f] > 1) > -1;
  }

  handleSubmit() {
    const {
      Review: {
        batch: { school, college },
      },
    } = this.props.store;
    const { actived } = this.state;
    if (actived === "本科批") {
      if (school.findIndex((f) => !f.code || !f.schoolName) > -1) {
        Taro.showModal({
          title: "提示",
          content: "本科批存在未填写项",
          confirmText: "确认",
        }).then((res) => {});
        return;
      } else if (school.length < 10) {
        Taro.showModal({
          title: "提示",
          content: "至少填写10个志愿",
          confirmText: "确认",
        }).then((res) => {});
        return;
      } else if (this.isRepeat(school)) {
        Taro.showModal({
          title: "提示",
          content: "本科批存在重复的学校",
          confirmText: "确认",
        }).then((res) => {});
        return;
      }
    } else {
      if (college.findIndex((f) => !f.code || !f.schoolName) > -1) {
        Taro.showModal({
          title: "提示",
          content: "高职专科批存在未填写项",
          confirmText: "确认",
        }).then((res) => {});
        return;
      } else if (college.length < 10) {
        Taro.showModal({
          title: "提示",
          content: "至少填写10个志愿",
          confirmText: "确认",
        }).then((res) => {});
        return;
      }
    }

    this.toSave();
  }

  handleChange(data, e) {
    let { value } = e.detail;
    const { key, index } = data;
    if (key === "code") {
      if (e.mpEvent.type === "confirm" || e.mpEvent.type === "blur") {
        if (value.length >= 4) {
          this.getSchoolByCode({ index, value });
        } else {
          Taro.showToast({ title: "请输入4-5位数字代码", icon: "none" });
          return;
        }
      } else {
        if (value.length >= 4) {
          this.getSchoolByCode({ index, value });
        } else if (value.length > 5) {
          Taro.showToast({ title: "请输入4-5位数字代码", icon: "none" });
          return;
        }
      }
    } else if (key === "adjust") {
      this.setItemData({ index, data: { [key]: value == 1 } });
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
    const { actived } = this.state;
    const {
      Review,
      Review: {
        batch: { school, college },
      },
    } = this.props.store;
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
    Review.setBatch({ school, college });
  }

  render() {
    const { actived } = this.state;
    const {
      Review: {
        batch: { school, college },
      },
    } = this.props.store;
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
                    onBlur={this.handleChange.bind(this, {
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
                  {/* === 1 ? "是" : "否" */}
                  <Picker
                    className="b-vol-batch-item-picker"
                    value={item.adjust}
                    range={adjust}
                    rangeKey="name"
                    onChange={this.handleChange.bind(this, {
                      key: "adjust",
                      index,
                    })}
                  >
                    <SelectLabel
                      value={item.adjust ? "是" : "否"}
                    ></SelectLabel>
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
