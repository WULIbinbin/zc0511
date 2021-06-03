import { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Input, Image } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { FormItem } from "../../../components/index";
import { RemApply } from "../../../request/apis/recommend";
import "./index.scss";

import ShenhePng from "../image/shenhe.png";

@inject("store")
@observer
class Index extends Component {
  state = {
    formData: {
      wx: "",
      tel: "",
      name: "",
    },
    showPage: false,
    status: -1,
  };
  componentWillMount() {
    Taro.showLoading();
  }

  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  getData() {
    const { Recommend } = this.props.store;
    Recommend.getInfo().then((res) => {
      console.log(res);
      if (res.status === 0) {
        Taro.hideLoading();
        Taro.showToast({ title: "申请审核中", icon: "none", duration: 1000 });
      } else if (res.status === 1) {
        Taro.redirectTo({
          url: "/pages/recommend/list/index",
        });
        return;
      } else if (res.status === 2) {
        Taro.showToast({
          title: "审核失败，请重新申请",
          icon: "none",
          duration: 2000,
        });
      }
      Taro.hideLoading();
      this.setState({
        showPage: true,
        status: res.status,
      });
    });
  }

  handleSubmit() {
    const { Common } = this.props.store;
    const { formData } = this.state;
    console.log(formData);
    if (formData.wx == "" || formData.tel == "" || formData.name == "") {
      Taro.showToast({ title: "请输入申请信息", icon: "none" });
      return;
    }
    if (!Common.phoneVerify(formData.tel)) {
      Taro.showToast({ title: "请输入正确的手机号", icon: "none" });
      return;
    }
    RemApply(formData).then((res) => {
      if (res.status == 0) {
        Taro.showToast({ title: "提交成功", icon: "none" });
        this.getData();
        // setTimeout(() => {
        //   Taro.redirectTo({
        //     url: "/pages/recommend/list/index",
        //   });
        // }, 1200);
      } else {
        Taro.showToast({ title: "提交失败，请重试", icon: "none" });
      }
    });
  }

  handleChange(key, e) {
    console.log(key, e);
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        [key]: e.detail.value,
      },
    });
  }
  render() {
    const { showPage, status } = this.state;
    if (showPage) {
      return [1, -1, -3].includes(status) ? (
        <View className="b-recommend-page">
          <View className="b-recommend-content">
            <View className="b-recommend-title">申请成为推荐官</View>
            <FormItem label="姓名:" labelWidth={80}>
              <Input
                className="b-recommend-input"
                type="text"
                onInput={this.handleChange.bind(this, "name")}
              ></Input>
            </FormItem>
            <FormItem label="手机:" labelWidth={80}>
              <Input
                className="b-recommend-input"
                maxlength={11}
                type="number"
                onInput={this.handleChange.bind(this, "tel")}
              ></Input>
            </FormItem>
            <FormItem label="微信:" labelWidth={80}>
              <Input
                className="b-recommend-input"
                type="text"
                onInput={this.handleChange.bind(this, "wx")}
              ></Input>
            </FormItem>
            <View
              className="b-recommend-apply"
              onClick={this.handleSubmit.bind(this)}
            >
              立即申请
            </View>
          </View>
        </View>
      ) : (
        <View className="b-recommend-review">
          <View className="b-recommend-review-body">
            <Image
              src={ShenhePng}
              className="b-recommend-review-bg"
              mode="widthFix"
            ></Image>
            <View className="b-recommend-review-pending">
              您已成功申请，正在审核中...
            </View>
          </View>
        </View>
      );
    } else {
      return null;
    }
  }
}

export default Index;
