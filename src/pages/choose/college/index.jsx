import { Component } from "react";
import { View, ScrollView } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { PickerLabel, Table } from "../../../components/index";
import { SearchSubject } from "../../../request/apis/college";
import "./index.scss";

@inject("store")
@observer
class Index extends Component {
  componentWillMount() {}

  componentDidMount() {
    const {
      options: { subStr },
    } = getCurrentPages()[getCurrentPages().length - 1];
    SearchSubject({subStr}).then(res=>{

    })
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const thead = [
      {
        key: "cname",
        name: "院校名称",
      },
      {
        key: "sname",
        name: "专业名称",
      },
      {
        key: "subject",
        name: "包含专业",
      },
      {
        key: "require",
        name: "选科要求",
      },
    ];
    const tbody = [
      {
        cname: "湘潭大学",
        sname: "电子商务",
        subject: "120801-电子商务",
        require: "不限",
      },
    ];
    return (
      <View className="b-choose-college">
        <View className="top-bar">
          <PickerLabel placeHolder="院校地区"></PickerLabel>
          <PickerLabel placeHolder="院校层次"></PickerLabel>
        </View>
        <ScrollView scrollY className="main">
          <View className="list">
            <Table thead={thead} tbody={tbody} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Index;
