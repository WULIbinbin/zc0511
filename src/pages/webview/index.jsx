import { Component } from "react";
import { View, WebView } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import Taro from "@tarojs/taro";
import "./index.scss";

@inject("store")
@observer
class Index extends Component {
  state = {
    url: "",
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {
    const {
      options: { url, title='' },
    } = getCurrentPages()[getCurrentPages().length - 1];
    console.log("================>scene", url);
    Taro.setNavigationBarTitle({ title });
    this.setState({
      url,
    });
  }

  componentDidHide() {}

  render() {
    const { url } = this.state;
    const { windowHeight } = Taro.getSystemInfoSync();
    return (
      <View>
        <WebView style={{ height: windowHeight }} src={url}></WebView>
      </View>
    );
  }
}

export default Index;
