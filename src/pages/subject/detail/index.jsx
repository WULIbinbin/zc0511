import { Component } from "react";
import Taro from "@tarojs/taro";
import { View, ScrollView, Text } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { Describe } from "../../../components/index";
import { GetSubjectDetail } from "../../../request/apis/college";
import "./index.scss";

@inject("store")
@observer
class Index extends Component {
  state = {
    detail: {},
  };

  componentWillMount() {}

  componentDidMount() {
    const {
      options: { code },
    } = getCurrentPages()[getCurrentPages().length - 1];
    GetSubjectDetail(code).then((res) => {
      this.setState({
        detail: res.data,
      });
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { detail } = this.state;
    return (
      <ScrollView className="b-subject-detail">
        <View className="main">
          <View className="topic">
            <View className="title">{detail.majorName}</View>
            <View className="code">专业代码：{detail.code}</View>
          </View>
          <Describe title="基本信息">
            <View className="col">
              <Text>学课门类：{detail.subjectName}</Text>
              <Text>学课大类：{detail.categoryName}</Text>
              <Text>修业年限：{detail.studyDuration} </Text>
              <Text>授予学位：{detail.degree}</Text>
            </View>
          </Describe>
          <Describe title="专业概述">{detail.introduce}</Describe>
          <Describe title="主修课程">{detail.course}</Describe>
          {detail.job && <Describe title="相关职业">{detail.job}</Describe>}
        </View>
      </ScrollView>
    );
  }
}

export default Index;
