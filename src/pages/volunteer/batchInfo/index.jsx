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
    console.log(schoolBatch)
    return (
      <View className="b-vol-page">
        {schoolBatch.length > 0 && (
          <VolTable
            school={schoolBatch}
            college={collegeBatch}
            showMidTitle={false}
            showIcon={false}
          />
        )}
      </View>
    );
  }
}

export default Index;
