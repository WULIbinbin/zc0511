import { Component } from "react";
import { View, Image } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { PageView } from "../../../components/index";
import { VolStar } from "../components/index";
import { SaveStar } from "../../../request/apis/report";
import Taro from "@tarojs/taro";
import "./index.scss";

import Yuwen from "../image/yuwen.png";
import Shuxue from "../image/shuxue.png";
import Yingyu from "../image/yingyu.png";
import Wuli from "../image/wuli.png";
import Shengwu from "../image/shengwu.png";
import Huaxue from "../image/huaxue.png";
import Zhengzhi from "../image/zhengzhi.png";
import Dili from "../image/dili.png";
import Lishi from "../image/Lishi.png";

import Other from "../image/other.png";

const Stars = {
  语文: Yuwen,
  数学: Shuxue,
  英语: Yingyu,
  物理: Wuli,
  生物: Shengwu,
  化学: Huaxue,
  政治: Zhengzhi,
  思想政治: Zhengzhi,
  地理: Dili,
  历史: Lishi,
  文综: Zhengzhi,
  理综: Wuli,
};
@inject("store")
@observer
class Index extends Component {
  state = {
    starList: [],
  };

  selected = [];
  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {
    Taro.nextTick(() => {
      const {
        Account: { userInfo },
      } = this.props.store;
      if (userInfo.subList) {
        const selected = [];
        const starList = userInfo.subList.map((n) => {
          selected.push({ ...n });
          return {
            id: n.id,
            name: n.subject,
            icon: Stars[n.subject],
          };
        });
        this.selected = selected;
        this.setState({
          starList,
        });
      }
    });
  }

  componentDidHide() {}

  handleStar(index, num) {
    console.log(index, num);
    const { selected } = this;
    selected[index].star = num;
  }

  handleSubmit() {
    const params = JSON.stringify(this.selected);
    SaveStar(params).then((res) => {
      if (res.status === 0) {
        Taro.showToast({ title: "保存成功", icon: "success" });
        const {
          Account
        } = this.props.store;
        Account.GetUserInfo()
        Taro.navigateBack()
      } else {
        Taro.showToast({ title: "保存失败，请重试", icon: "none" });
      }
    });
  }

  render() {
    const { starList } = this.state;
    return (
      <PageView bgColor="#f7f7f7">
        <View>
          {starList.map((n, i) => (
            <VolStar {...n} onChange={this.handleStar.bind(this, i)} />
          ))}
        </View>
        <View
          className="b-vol-star-sure"
          onClick={this.handleSubmit.bind(this)}
        >
          确定
        </View>
        {/* <Image
          className="b-vol-star-bottom"
          mode="widthFix"
          src={Other}
        ></Image> */}
      </PageView>
    );
  }
}

export default Index;
