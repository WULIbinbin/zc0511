import { observable } from "mobx";
import Taro from "@tarojs/taro";
import {
  PreferenceList,
  GetOrderByType,
  GetOrderDetail,
} from "../request/apis/report";

const review = observable({
  orderStatus: {
    isNeedPay: true,
    report: {
      payStatus: false,
      num: "",
    },
    type: 3,
  },
  oldOrderStatus:{
    isNeedPay: true,
    report: {
      payStatus: false,
      num: "",
    },
    type: 3,
  },
  orderData: {
    sortList: [],
    sortScore: 0,
    school: [],
    college: [],
    info: null,
  },
  batch: {
    school: [],
    college: [],
  },
  get hasPay() {
    return (
      this.orderStatus.isNeedPay == false ||
      this.orderStatus.report.payStatus == true
    );
  },
  get isZNUse(){
    return this.oldOrderStatus.report.payStatus===true
  },
  //微信支付：isNeedPay==true||report.payStatus==false
  //免费一次支付：isNeedPay==false||report.payStatus==false
  get isPay() {
    return this.orderStatus.report.payStatus === true;
  },
  get orderNum() {
    return this.orderStatus.report.num;
  },
  get schoolBatch() {
    return this.batch.school;
  },
  get collegeBatch() {
    return this.batch.college;
  },
  get getBatch() {
    return this.batch;
  },
  setBatch(batch) {
    this.batch = batch;
  },
  getReviewOrder() {
    Taro.showLoading({title:'加载中'});
    PreferenceList().then((res) => {
      console.log("==========================>获取审核服务数据", res.data);
      Taro.hideLoading();
      if (res.status === 0) {
        this.orderData = res.data;
        this.setBatch(this.orderData);
      }
    });
  },
  getOrderStatus() {
    GetOrderByType(2).then((res) => {
      console.log("==========================>获取订单状态", res.data);
      this.orderStatus = res.data;
      this.oldOrderStatus = res.data
    });
  },
  resetOrderData() {
    this.orderData = {
      sortList: [],
      sortScore: 0,
      school: [],
      college: [],
      info: null,
    };
    this.batch = {
      school: [],
      college: [],
    };
    this.orderStatus = {
      isNeedPay: this.oldOrderStatus.isNeedPay,
      report: {
        payStatus: false,
        num: "",
      },
      type: 3,
    };
  },
  getOrderDetail(id){
    Taro.showLoading({title:'加载中'});
    GetOrderDetail(id).then(res=>{
      Taro.hideLoading();
      if (res.status === 0) {
        this.orderData = res.data;
        this.setBatch(this.orderData);
      }
    })
  }
});

export default review;
