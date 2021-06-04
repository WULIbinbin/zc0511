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
    canIUseGetUserProfile: false,
  };

  componentWillMount() {
    if (wx.getUserProfile) {
      this.setState({
        canIUseGetUserProfile: true,
      });
    }
  }

  componentDidMount() {
    Taro.showLoading();
    setTimeout(() => {
      Taro.hideLoading();
      const {
        Subject,
        Account: { studentInfo, subjectInfo },
      } = this.props.store;
      if (studentInfo && studentInfo.province) {
        const { province, city, district, name, sex } = studentInfo;
        Subject.setFormData({
          province,
          city,
          district,
          name,
          sex: sex ? "男" : "女",
        });
        Subject.setCurProv(province);
        Subject.setCurSubList(subjectInfo);
      }
    }, 800);
  }

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

  handleChangeProv(e) {
    const {
      Subject,
      Subject: { formData },
    } = this.props.store;
    const [province, city, district] = e.detail.value;
    Object.assign(formData, { province, city, district });
    Subject.setFormData(formData);
    Subject.setCurProv(formData.province);
  }

  handleSelectSubject(e) {
    const { Subject } = this.props.store;
    Subject.selectSubject(e);
  }

  handleInputName(e) {
    const {
      Subject,
      Subject: { formData },
    } = this.props.store;
    formData.name = e.detail.value;
    Subject.setFormData(formData);
  }

  stepItem(subject, cur) {
    const {
      Subject: { subjectFilter, curSubjectList },
    } = this.props.store;
    return (
      <View
        className={`step-select-item ${
          curSubjectList.includes(subject) && "checked"
        }`}
        onClick={this.handleSelectSubject.bind(this, {
          type: subjectFilter.type,
          cur,
          subject,
        })}
      >
        <View className="step-select-item-text">{subject}</View>
      </View>
    );
  }

  handleSelectSex(item) {
    const {
      Subject,
      Subject: { formData },
      Account: { studentInfo },
    } = this.props.store;
    if (studentInfo.sex === undefined) {
      return;
    }
    formData.sex = item.text;
    Subject.setFormData(formData);
  }

  isCanNext() {
    const {
      Subject: {
        curSubjectList,
        subjectFilter,
        noSuport,
        formData: { province, city, district, name, sex },
      },
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

  handleScoreInput({ index }, e) {
    //console.log(e);
    const { Subject } = this.props.store;
    const { value } = e.detail;
    if (isNaN(Number(value))) {
      return;
    }
    Subject.setSubjectScore({ index, score: Number(value) });
  }

  handleNext() {
    this.handleStepChange("成绩信息");
  }

  isCanSubmit() {
    const {
      Subject: { showSubList },
    } = this.props.store;
    if (
      showSubList.findIndex((f) => f.score == undefined || f.score == "") === -1
    ) {
      return true;
    }
    return false;
  }

  getUserProfile() {
    console.log("getUserProfile");
    const that = this;
    wx.getUserProfile({
      desc: "用于完善会员资料",
      success: (res) => {
        console.log(res);
        that.handleSubmit({ detail: res });
      },
      fail(err) {
        console.log(err);
      },
    });
  }

  handleSubmit(e) {
    const {
      userInfo: { avatarUrl, nickName },
    } = e.detail;
    const {
      Subject: { spProv, formData, showSubList },
      Account,
    } = this.props.store;
    if (
      showSubList.findIndex((f) => f.score === undefined || f.score === "") ===
      -1
    ) {
      let score = 0;
      formData.subList = showSubList.map((item) => {
        const arrItem = { ...item };
        score += Number(item.score);
        return arrItem;
      });
      formData.province = spProv(formData.province);
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
          Account.GetUserInfo();
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
      Subject: { subjectFilter, showSubList, formData },
      Account: { studentInfo },
    } = this.props.store;
    const { checked, canIUseGetUserProfile } = this.state;
    const region =
      (formData.province && [
        formData.province,
        formData.city,
        formData.district,
      ]) ||
      [];
    //const sex = studentInfo.sex ? "男" : "女";
    //value={region}
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
                    disabled={!!studentInfo.province}
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
                    disabled={!!studentInfo.name}
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
                        formData.sex === n.text && "checked"
                      }`}
                      onClick={this.handleSelectSex.bind(this, n)}
                    >
                      <View className={`step-select-item-text`}>
                        <Image
                          className="step-select-item-sex"
                          src={formData.sex === n.text ? n.sel : n.nor}
                        ></Image>
                        {n.text}
                      </View>
                    </View>
                  ))}
                </FormItem>
                {subjectFilter.type === "TYPE_ALL_IN_3" && (
                  <View>
                    <FormItem label="组合选科：">
                      {subjectFilter.sub3.map((subject) =>
                        this.stepItem(subject, 3)
                      )}
                    </FormItem>
                  </View>
                )}
                {subjectFilter.type === "TYPE_2_AND_4" && (
                  <View>
                    <FormItem label="首选科目：">
                      {subjectFilter.sub1.map((subject) =>
                        this.stepItem(subject, 1)
                      )}
                    </FormItem>
                    <FormItem label="次选科目：">
                      {subjectFilter.sub2.map((subject) =>
                        this.stepItem(subject, 2)
                      )}
                    </FormItem>
                  </View>
                )}
                {subjectFilter.type === "ZH_2_IN_1" && (
                  <View>
                    <FormItem label="高考选科：">
                      {subjectFilter.sub3.map((subject) =>
                        this.stepItem(subject, 3)
                      )}
                    </FormItem>
                  </View>
                )}
              </View>
            )}
            {checked === "成绩信息" && (
              <View className="main">
                {showSubList.map((n, index) => (
                  <FormItem label={`${n.subject}：`}>
                    <Input
                      className="b-form-input"
                      value={n.score || ""}
                      type="number"
                      onInput={this.handleScoreInput.bind(this, {
                        index,
                      })}
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
              <>
                {!canIUseGetUserProfile ? (
                  <Button
                    className={`btn can-click`}
                    openType="getUserInfo"
                    onGetUserInfo={this.handleSubmit.bind(this)}
                  >
                    <View className="text">确定</View>
                  </Button>
                ) : (
                  <Button
                    className={`btn can-click`}
                    onClick={this.getUserProfile.bind(this)}
                  >
                    <View className="text">确定</View>
                  </Button>
                )}
              </>
            )}
          </View>
        )}
      </View>
    );
  }
}

export default Index;
