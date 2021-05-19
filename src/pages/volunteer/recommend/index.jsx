import { Component } from "react";
import { View } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { PageView } from "../../../components/index";
import { VolTitle,VolTestInfo } from "../components/index";
import "./index.scss";

@inject("store")
@observer
class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <PageView bgColor='#f7f7f7'>
        <VolTitle title="志愿填报推荐" desc="报告单号：CYZY-0000001"></VolTitle>
        <VolTestInfo />
      </PageView>
    );
  }
}

export default Index;
