import { observable } from "mobx";
import Taro from "@tarojs/taro";
import { PreferenceList } from "../request/apis/report";

const review = observable({
  orderData: {
    ai: 0,
    isPay: 0,
    school: [],
    college: [],
  },
  batch: {
    school: [],
    college: [],
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
  get shouldPay() {
    return this.orderData.ai === 0 && this.orderData.isPay === 0;
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
});

export default review;
