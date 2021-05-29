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
    const {
      Report: { collegeBatch, schoolBatch },
    } = this.props.store;
    return (
      <View className="b-vol-page">
        {schoolBatch.length > 0 && (
          <VolTable data={schoolBatch} showMidTitle={false} showIcon={false} />
        )}
        {collegeBatch.length > 0 && (
          <VolTable
            batch="高职专科批"
            data={collegeBatch}
            showMidTitle={false}
            showIcon={false}
          />
        )}
      </View>
    );
  }
}

export default Index;
