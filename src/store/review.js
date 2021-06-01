import { observable } from "mobx";
import Taro from "@tarojs/taro";
import {
  PreferenceList,
  GetOrderByType,
  GetOrderById,
} from "../request/apis/report";

const review = observable({
  orderStatus: {
    isNeedPay: true,
    report: {
      payStatus: false,
      num: "",
    },
  },
  orderData: {
    sortList:[],
    sortScore:0,
    school: [],
    college: [],
    info:null,
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
    Taro.showLoading();
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
      this.orderStatus = res.data;
    });
  },
});

export default review;
