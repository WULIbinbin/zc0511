import { Component } from "react";
import { View, ScrollView } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { VolTable } from "../components/index";
import "./index.scss";

@inject("store")
@observer
class Index extends Component {
  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="b-vol-page">
        <VolTable
          showMidTitle={false}
          showIcon={false}
        />
      </View>
    );
  }
}

export default Index;
