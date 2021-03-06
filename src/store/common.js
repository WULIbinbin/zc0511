import { observable } from "mobx";
import { GetAllPrice, GetWxReviewStatus } from "../request/apis/home";

const common = observable({
  curProv: "北京",
  province: [
    "北京",
    "天津",
    "河北",
    "山西",
    "内蒙古",
    "辽宁",
    "吉林",
    "黑龙江",
    "上海",
    "江苏",
    "浙江",
    "安徽",
    "福建",
    "江西",
    "山东",
    "河南",
    "湖北",
    "湖南",
    "广东",
    "广西",
    "海南",
    "重庆",
    "四川",
    "贵州",
    "云南",
    "西藏",
    "陕西",
    "甘肃",
    "青海",
    "宁夏",
    "新疆",
    "台湾",
    "香港",
    "澳门",
  ],
  category: [
    "综合",
    "农林",
    "医药",
    "师范",
    "语言",
    "理工",
    "财经",
    "政法",
    "体育",
    "艺术",
    "民族",
    "军事",
    "其他",
  ],
  level: [
    //是否为双一流：0否，1是
    //tag1: [0, 1],
    //是否为985：0否，1是
    //tag2: [0, 1],
    //是否为211：0否，1是
    //tag3: [0, 1],
    "本科",
    "专科",
    "双一流",
    "985",
    "211",
  ],
  subtype: ["综合", "文科", "理科"],
  zxCity: ["北京市", "天津市", "上海市", "重庆市"],
  allPrice: null,
  reviewStatus: null,
  get vipPrice() {
    return (this.allPrice && this.allPrice.find((f) => f.name === "vip")) || {};
  },
  get reportPrice() {
    return (
      (this.allPrice && this.allPrice.find((f) => f.name === "report")) || {}
    );
  },
  get professorPrice() {
    return (
      (this.allPrice && this.allPrice.find((f) => f.name === "professor")) || {}
    );
  },
  get aiPrice() {
    return (this.allPrice && this.allPrice.find((f) => f.name === "ai")) || {};
  },
  get onlinePrice() {
    return (
      (this.allPrice && this.allPrice.find((f) => f.name === "online")) || {}
    );
  },
  get isReviewing() {
    const { model } = wx.getSystemInfoSync();
    return model.indexOf("iPhone") > -1 && this.reviewStatus == 1;
  },
  phoneVerify(phone = "") {
    return /^[1][3,4,5,7,8,9][0-9]{9}$/.test(phone);
  },
  getAllPrice() {
    GetAllPrice().then((res) => {
      this.allPrice = res.data;
    });
  },
  getReviewStatus() {
    GetWxReviewStatus().then((res) => {
      this.reviewStatus = res.data;
    });
  },
});

export default common;
