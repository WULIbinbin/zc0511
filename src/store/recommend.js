import { observable } from "mobx";
import { RemInfo } from "../request/apis/recommend";

const recommend = observable({
  info: {
    status:0
  },
  getInfo() {
    return RemInfo().then((res) => {
      if (res.data != null) {
        this.info = res.data;
      }else{
        this.info.status = -1
      }
      return Promise.resolve(this.info)
    });
  },
});

export default recommend;
