import { Component } from "react";
import { Provider } from "mobx-react";
import Store from "./store/index";

import "./app.scss";

class App extends Component {
  onLaunch(){
    // const storage = wx.getStorageSync("token");
    // Store.Account.CheckCode().then(()=>{
    //   if (storage && storage.access_token && storage.phoneNumber) {
    //     Store.Account.GetUserInfo();
    //     Store.Review.getOrderStatus();
    //     Store.Tutor.getOrderStatus();
    //     Store.Tutor.getOnline();
    //     Store.Recommend.getInfo();
    //   }
    // })
    Store.Common.getAllPrice();
  }
  componentDidMount() {
    
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 就是要渲染的页面
  render() {
    return <Provider store={Store}>{this.props.children}</Provider>;
  }
}

export default App;
