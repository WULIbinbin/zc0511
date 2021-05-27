import { Component } from "react";
import { View, Image, Picker, Input, Button } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import Taro from "@tarojs/taro";
import { SelectLabel, FormItem } from "../../../components/index";
import { SaveInfo } from "../../../request/apis/inform";
import "./index.scss";

import MaleNor from "../../../static/image/male-nor.png";
import MaleSel from "../../../static/image/male.png";
import FemaleNor from "../../../static/image/female-nor.png";
import FemaleSel from "../../../static/image/female.png";

@inject("store")
@observer
class Index extends Component {
  state = {
    checked: "个人信息",
    formData: {
      province: "",
      city: "",
      district: "",
      name: "",
      sex: "",
      // score: "",
      // subList: [],
    },
    scoreInput: {},
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleStepChange(checked) {
    const {
      Subject: { noSuport },
    } = this.props.store;
    if (checked === "成绩信息" && noSuport) {
      Taro.showToast({
        title: "暂不支持港澳台地区",
        icon: "none",
      });
      return;
    }
    if (checked === "成绩信息" && !this.isCanNext()) {
      Taro.showToast({
        title: "请完善个人信息",
        icon: "none",
      });
      return;
    }
    this.setState({
      checked,
    });
  }

  getSubjectData() {
    const { Subject } = this.props.store;
    const {
      formData: { province },
    } = this.state;
    Subject.setCurProv(province);
  }

  handleChangeProv(e) {
    const { formData } = this.state;
    const [province, city, district] = e.detail.value;
    Object.assign(formData, { province, city, district });
    this.setState(
      {
        formData,
      },
      () => {
        this.getSubjectData();
      }
    );
  }

  handleSelectSubject(e) {
    const { Subject } = this.props.store;
    Subject.selectSubject(e);
  }

  handleInputName(e) {
    const { formData } = this.state;
    formData.name = e.detail.value;
    this.setState({ formData });
  }

  stepItem(subName, cur) {
    const {
      Subject: { subjectFilter, curSubjectList },
    } = this.props.store;
    return (
      <View
        className={`step-select-item ${
          curSubjectList.includes(subName) && "checked"
        }`}
        onClick={this.handleSelectSubject.bind(this, {
          type: subjectFilter.type,
          cur,
          subName,
        })}
      >
        <View className="step-select-item-text">{subName}</View>
      </View>
    );
  }

  handleSelectSex(item) {
    const { formData } = this.state;
    formData.sex = item.text;
    this.setState({ formData });
  }

  isCanNext() {
    const {
      formData: { province, city, district, name, sex },
    } = this.state;
    const {
      Subject: { curSubjectList, subjectFilter, noSuport },
    } = this.props.store;
    if (
      !noSuport &&
      [province, city, district, name, sex].findIndex((f) => f === "") === -1 &&
      curSubjectList.length === subjectFilter.mustSelect
    ) {
      return true;
    }
    return false;
  }

  handleScoreInput(item, e) {
    console.log(item, e);
    const { scoreInput } = this.state;
    const { value } = e.detail;
    if (isNaN(Number(value))) {
      this.setState({ scoreInput });
      return;
    }
    scoreInput[item.subject] = {
      ...item,
      score: Number(value),
    };
    this.setState({ scoreInput });
  }

  handleNext() {
    this.handleStepChange("成绩信息");
  }

  isCanSubmit() {
    const { scoreInput } = this.state;
    const {
      Subject: { mapSubjectList },
    } = this.props.store;
    const keysScoreInput = Object.keys(scoreInput);
    if (
      keysScoreInput.length === mapSubjectList.length &&
      keysScoreInput.findIndex((f) => scoreInput[f].score == undefined) === -1
    ) {
      return true;
    }
    return false;
  }

  handleSubmit(e) {
    console.log(e);
    const {
      userInfo: { avatarUrl, nickName },
    } = e.detail;
    const { scoreInput, formData } = this.state;
    const {
      Subject: { mapSubjectList, spProv },
      Account: { GetUserInfo },
    } = this.props.store;
    const keysScoreInput = Object.keys(scoreInput);
    if (keysScoreInput.length === mapSubjectList.length) {
      let score = 0;
      formData.subList = mapSubjectList.map((item) => {
        const arrItem = { ...item };
        arrItem["score"] = scoreInput[item.subject].score;
        score += arrItem["score"];
        return arrItem;
      });
      //formData.province = spProv(formData.province);
      formData.sex = formData.sex === "男" ? 1 : 0;
      formData.score = score;
      formData.nickname = nickName;
      formData.headImgUrl = avatarUrl;
      formData.openid = Taro.getStorageSync("token").openId;
      console.log(formData);
      SaveInfo({
        ...formData,
      }).then((res) => {
        if (res.status === 0) {
          Taro.showToast({ title: "提交成功", icon: "success" });
          GetUserInfo();
          setTimeout(() => {
            Taro.navigateBack();
          }, 1200);
        } else {
          Taro.showToast({ title: res.data + ",请重试", icon: "none" });
        }
      });
    }
  }

  render() {
    const step = ["个人信息", "成绩信息"];
    const sexArr = [
      {
        text: "男",
        sel: MaleSel,
        nor: MaleNor,
      },
      {
        text: "女",
        sel: FemaleSel,
        nor: FemaleNor,
      },
    ];
    const {
      Subject: { subjectFilter, mapSubjectList },
    } = this.props.store;
    const {
      checked,
      formData,
      formData: { province, city, district, sex },
      scoreInput,
    } = this.state;
    const region = (province && [province, city, district]) || [];
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
                    value={region}
                    onChange={this.handleChangeProv.bind(this)}
                  >
                    <View className="step-select-city">
                      <SelectLabel
                        placeHolder="请选择地区"
                        width={400}
                        value={region.join("-")}
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
                  {sexArr.map((n, i) => (
                    <View
                      className={`step-select-item ${
                        sex === n.text && "checked"
                      }`}
                      onClick={this.handleSelectSex.bind(this, n)}
                    >
                      <View className={`step-select-item-text`}>
                        <Image
                          className="step-select-item-sex"
                          src={sex === n.text ? n.sel : n.nor}
                        ></Image>
                        {n.text}
                      </View>
                    </View>
                  ))}
                </FormItem>
                {subjectFilter.type === "TYPE_ALL_IN_3" && (
                  <View>
                    <FormItem label="组合选科：">
                      {subjectFilter.sub1.map((subName) =>
                        this.stepItem(subName, "sub1")
                      )}
                    </FormItem>
                  </View>
                )}
                {subjectFilter.type === "TYPE_2_AND_4" && (
                  <View>
                    <FormItem label="首选科目：">
                      {subjectFilter.sub1.map((subName) =>
                        this.stepItem(subName, "sub1")
                      )}
                    </FormItem>
                    <FormItem label="次选科目：">
                      {subjectFilter.sub2.map((subName) =>
                        this.stepItem(subName, "sub2")
                      )}
                    </FormItem>
                  </View>
                )}
                {subjectFilter.type === "ZH_2_IN_1" && (
                  <View>
                    <FormItem label="高考选科：">
                      {subjectFilter.sub1.map((subName) =>
                        this.stepItem(subName, "sub1")
                      )}
                    </FormItem>
                  </View>
                )}
              </View>
            )}
            {checked === "成绩信息" && (
              <View className="main">
                {mapSubjectList.map((n) => (
                  <FormItem label={`${n.subject}：`}>
                    <Input
                      className="b-form-input"
                      value={
                        (scoreInput[n.subject] &&
                          scoreInput[n.subject].score) ||
                        ""
                      }
                      type="number"
                      onInput={this.handleScoreInput.bind(this, n)}
                    ></Input>
                  </FormItem>
                ))}
              </View>
            )}
          </View>
        </View>
        {checked === "个人信息" && (
          <View>
            {!this.isCanNext() ? (
              <View className={`btn`}>
                <View className="text">下一步</View>
              </View>
            ) : (
              <View
                className={`btn can-click`}
                onClick={this.handleNext.bind(this)}
              >
                <View className="text">下一步</View>
              </View>
            )}
          </View>
        )}
        {checked === "成绩信息" && (
          <View>
            {!this.isCanSubmit() ? (
              <View className={`btn`}>
                <View className="text">确定</View>
              </View>
            ) : (
              <Button
                className={`btn can-click`}
                openType="getUserInfo"
                onGetUserInfo={this.handleSubmit.bind(this)}
              >
                <View className="text">确定</View>
              </Button>
            )}
            {/* <button open-type="getUserInfo">222</button>
            <Button
              className={`btn can-click`}
              openType="getUserInfo"
              onGetUserInfo={this.handleSubmit.bind(this)}
            >
              <View className="text">确定</View>
            </Button> */}
          </View>
        )}
      </View>
    );
  }
}

export default Index;
