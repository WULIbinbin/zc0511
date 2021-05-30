import { Component } from "react";
import { View, Image, Input } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import VolTestInfo from "../../volunteer/components/TestInfo";
import "./index.scss";

import MineIcon from "../image/mine.png";
import ChongIcon from "../image/chon.png";
import WenIcon from "../image/wen.png";
import BaoIcon from "../image/bao.png";
import ArrowIcon from "../../../static/image/arrow-right.png";

@inject("store")
@observer
class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const accessList = [
      {
        icon: ChongIcon,
        title: "冲刺院校",
        desc: "录取率20%左右",
        accessText: "20",
        todo: "",
      },
      {
        icon: WenIcon,
        title: "适中院校",
        desc: "录取率70%左右",
        accessText: "40",
        todo: "",
      },
      {
        icon: BaoIcon,
        title: "保底院校",
        desc: "录取率90%左右",
        accessText: "130",
        todo: "",
      },
    ];
    return (
      <View className="b-befit-page">
        <VolTestInfo
          showMidTitle={true}
          tableData={[]}
          midTitle={
            <View className="b-befit-midtitle b-bottom-line">
              <Image className="b-befit-midtitle-icon" src={MineIcon}></Image>
              <View className="b-befit-midtitle-text">成绩信息</View>
            </View>
          }
        ></VolTestInfo>
        {accessList.map((item) => (
          <View className="b-befit-item">
            <Image className="b-befit-item-icon" src={item.icon}></Image>
            <View className="b-befit-item-info">
              <View className="b-befit-item-title">{item.title}</View>
              <View className="b-befit-item-desc">{item.desc}</View>
            </View>
            <View className="b-befit-item-access">
              <View className="b-befit-item-access-text">
                {item.accessText}
              </View>
              <Image
                src={ArrowIcon}
                className="b-befit-item-access-icon"
              ></Image>
            </View>
          </View>
        ))}
      </View>
    );
  }
}

export default Index;
