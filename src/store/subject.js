import { observable } from "mobx";
import Taro from "@tarojs/taro";
const Prov3word = ["黑龙江", "内蒙古"];

const subject = observable({
  curSubList: [],
  curProv: "",
  subject: [
    {
      type: "TYPE_ALL_IN_3",
      prov: ["北京", "海南", "山东", "天津"],
      sub1: ["生物", "物理", "化学", "思想政治", "历史", "地理"],
      sub2: [],
      mustSelect: 3,
    },
    {
      type: "TYPE_2_AND_4",
      prov: ["重庆", "福建", "广东", "河北", "湖北", "湖南", "江苏", "辽宁"],
      sub1: ["物理", "历史"],
      sub2: ["生物", "政治", "化学", "地理"],
      mustSelect: 3,
    },
    {
      type: "ZH_2_IN_1",
      prov: [
        "安徽",
        "甘肃",
        "广西",
        "贵州",
        "黑龙江",
        "河南",
        "江西",
        "吉林",
        "内蒙古",
        "宁夏",
        "青海",
        "山西",
        "陕西",
        "四川",
        "新疆",
        "云南",
      ],
      sub1: ["文综", "理综"],
      sub2: [],
      mustSelect: 1,
    },
    {
      type: "TYPE_ALL_IN_3",
      prov: ["浙江"],
      sub1: ["生物", "物理", "化学", "思想政治", "历史", "地理", "技术"],
      sub2: [],
      mustSelect: 3,
    },
    {
      type: "TYPE_ALL_IN_3",
      prov: ["上海"],
      sub1: ["生命科学", "物理", "化学", "思想政治", "历史", "地理"],
      sub2: [],
      mustSelect: 3,
    },
  ],
  defaultSubject: {
    type: "",
    prov: [],
    sub1: [],
    sub2: [],
    mustSelect:1
  },
  get subjectFilter() {
    if (!this.curProv) {
      return this.defaultSubject;
    }
    return this.subject.find((item) => item.prov.includes(this.curProv));
  },
  get curSubjectList() {
    return this.curSubList.map((item) => item.subName);
  },
  setCurProv(curProv = "") {
    let provSp = "";
    if (Prov3word.includes(curProv.substring(0, 3))) {
      provSp = curProv.substring(0, 3);
    } else {
      provSp = curProv.substring(0, 2);
    }
    this.curSubList = [];
    this.curProv = provSp;
  },
  allInThree(findIndex, params) {
    if (findIndex > -1) {
      this.curSubList.splice(findIndex, 1);
    } else {
      if (this.curSubList.length < 3) {
        this.curSubList.push(params);
      } else {
        //只能选3科
        Taro.showToast({ title: "当前只能选3个科目", icon: "none" });
      }
    }
  },
  twoAndFour(findIndex, params) {
    if (findIndex > -1) {
      this.curSubList.splice(findIndex, 1);
    } else {
      if (params.cur === "sub1") {
        if (this.curSubList.filter((f) => f.cur === "sub1").length > 0) {
          Taro.showToast({ title: "首选科目只能选1个科目", icon: "none" });
          return;
        }
      }
      if (params.cur === "sub2") {
        if (this.curSubList.filter((f) => f.cur === "sub2").length > 1) {
          Taro.showToast({ title: "次选科目只能选2个科目", icon: "none" });
          return;
        }
      }
      this.curSubList.push(params);
    }
  },
  twoInOne(findIndex, params) {
    this.curSubList = [];
    this.curSubList.push(params);
  },
  selectSubject({ type = "", cur = "", subName = "" }) {
    console.log("当前选中");
    console.log({ type, cur, subName });
    const findIndex = this.curSubList.findIndex((f) => f.subName === subName);
    switch (type) {
      case "TYPE_ALL_IN_3":
        //多选3
        this.allInThree(findIndex, { type, cur, subName });
        break;
      case "TYPE_2_AND_4":
        //sub1=>2选一,sub2=>4选2
        this.twoAndFour(findIndex, { type, cur, subName });
        break;
      case "ZH_2_IN_1":
        this.twoInOne(findIndex, { type, cur, subName });
        break;
    }
    console.log(this.curSubList.slice());
  },
});

export default subject;
