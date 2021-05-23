import { Component } from "react";
import Taro from '@tarojs/taro'
import { View, Image, Button } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import "./index.scss";

@inject("store")
@observer
class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleGetPhone(e) {
    const { encryptedData, iv, errMsg } = e.detail;
    console.log(e)
    const { Account } = this.props.store;
    if(errMsg!=='getPhoneNumber:ok'){
      return
    }
    Account.WxLogin({ encryptedData, iv, errMsg }).then((res)=>{
      console.log(res)
      Taro.navigateBack()
    })
  }

  render() {
    return (
      <View className="b-login-page">
        <Button
          openType="getPhoneNumber"
          onGetPhoneNumber={this.handleGetPhone.bind(this)}
        >
          手机号登录
        </Button>
      </View>
    );
  }
}

export default Index;
