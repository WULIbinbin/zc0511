import { observable } from "mobx";
import Taro from "@tarojs/taro";
import {
  PreferenceList,
  GetOrderByType,
  GetRecommend,
  GetHolland,
  GetContact,
  GetOrderDetail
} from "../request/apis/report";

const review = observable({
  orderStatus: {
    isNeedPay: true,
    report: {
      payStatus: false,
      num: "",
    },
  },
  recommendData:null,
  holland: null,
  online:null,
  get orderNum() {
    return this.orderStatus.report.num;
  },
  get recommendProvince() {
    return this.recommendData && this.recommendData.province||[];
  },
  get recommendAll() {
    return this.recommendData && this.recommendData.all||[];
  },
  get hollandTypeList() {
    return this.holland && this.holland.typeList||[];
  },
  get hollandMajorList() {
    return this.holland && this.holland.majorList||[];
  },
  get hollandSubData(){
    return this.holland&&this.holland.hollandStr&&JSON.parse(this.holland.hollandStr)||{}
  },
  get hollandTypeWord(){
    return {
      en:this.hollandTypeList.map(n=>n.cate).join(' ')||'',
      cn:this.hollandTypeList.map(n=>n.memo.substring(0,2)).join('/')||''
    }
  },
  get isPayOnline(){
    return this.online!=null
  },
  get hasPay() {
    return (
      this.orderStatus.report.payStatus == true
    );
  },
  get isPay() {
    return this.orderStatus.report.payStatus == true;
  },
  getOrderStatus() {
    GetOrderByType(1).then((res) => {
      this.orderStatus = res.data;
    });
  },
  getRemSchool() {
    Taro.showLoading();
    GetRecommend().then((res) => {
      Taro.hideLoading();
      this.recommendData = res.data
    });
  },
  getHolland() {
    Taro.showLoading();
    GetHolland().then((res) => {
      Taro.hideLoading();
      this.holland = res.data;
    });
  },
  getOnline(){
    GetContact().then((res) => {
      console.log(res);
      if (res.data == null) return;
      this.online = res.data
    });
  },
  getOrderDetail(id){
    Taro.showLoading();
    GetOrderDetail(id).then(res=>{
      Taro.hideLoading();
      this.holland = res.data;
    })
    this.getRemSchool()
  }
});

export default review;
