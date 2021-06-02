import { Component } from "react";
import { View, ScrollView } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { PageView } from "../../../components/index";
import {
  VolTitle,
  VolTestInfo,
  VolPreference,
  VolModal,
  VolRecommend,
  VolSubject,
} from "../components/index";
import { WxPay } from "../../../request/apis/account";
import { GetOrderById } from "../../../request/apis/report";

import "./index.scss";

@inject("store")
@observer
class Index extends Component {
  componentDidMount() {
    const {
      options: { id },
    } = getCurrentPages()[getCurrentPages().length - 1];
    const { Tutor } = this.props.store;
    Tutor.getOrderDetail(id);
  }

  componentWillUnmount() {}

  componentDidShow() {
    
  }

  componentDidHide() {}


  render() {
    const {
      Tutor,
    } = this.props.store;
    return (
      <View className="b-vol-page">
        <VolTitle
          title="志愿填报推荐"
          desc={Tutor.orderNum ? `报告单号：${Tutor.orderNum}` : ""}
        ></VolTitle>
        <VolTestInfo showIcon={false}/>
        <VolRecommend />
        <VolPreference showIcon={false} todo="/pages/volunteer/prefer/index" />
        <VolModal showIcon={false} todo="/pages/evaluation/readme/index" />
      </View>
    );
  }
}

export default Index;
