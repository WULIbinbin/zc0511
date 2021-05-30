import { Component } from "react";
import { View, ScrollView } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import {
  VolTitle,
  VolTestInfo,
  VolPayment,
  VolTable,
  VolReport,
} from "../components/index";
import { PreferenceList } from "../../../request/apis/report";
import "./index.scss";

@inject("store")
@observer
class Index extends Component {
  state = {
    ai: 3,
    college: [],
    professor: 3,
    school: [],
  };

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {
    PreferenceList().then((res) => {
      if (res.status === 0) {
        this.setState({
          ...res.data,
        });
      }
    });
  }

  componentDidHide() {}

  render() {
    const { school, college } = this.state;
    return (
      <View className="b-vol-page">
        <VolTitle title="志愿审核报告" desc="报告单号：CYZY-0000001"></VolTitle>
        <VolTestInfo />
        <VolTable showData={false} school={school} college={college} todo="/pages/volunteer/batch/index" />
        <VolPayment />
        <VolReport />
      </View>
    );
  }
}

export default Index;
