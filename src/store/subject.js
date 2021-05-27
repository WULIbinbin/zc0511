import { observable } from "mobx";
import Taro from "@tarojs/taro";

const subject = observable({
  formData: {
    province: "",
    city: "",
    district: "",
    name: "",
    sex: "",
  },
  curSubList: [],
  curProv: "",
  noSuport: false,
  subListInneed: [
    { cur: "0", subject: "语文" },
    { cur: "0", subject: "数学" },
    { cur: "0", subject: "英语" },
  ],
  //subListFromReq: {},
  subject: [
    {
      type: "TYPE_ALL_IN_3",
      prov: ["北京", "海南", "山东", "天津"],
      sub3: ["生物", "物理", "化学", "思想政治", "历史", "地理"],
      //sub2: [],
      mustSelect: 6,
    },
    {
      type: "TYPE_2_AND_4",
      prov: ["重庆", "福建", "广东", "河北", "湖北", "湖南", "江苏", "辽宁"],
      sub1: ["物理", "历史"],
      sub2: ["生物", "政治", "化学", "地理"],
      mustSelect: 6,
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
      sub3: ["文综", "理综"],
      //sub2: [],
      mustSelect: 4,
    },
    {
      type: "TYPE_ALL_IN_3",
      prov: ["浙江"],
      sub3: ["生物", "物理", "化学", "思想政治", "历史", "地理", "技术"],
      //sub2: [],
      mustSelect: 6,
    },
    {
      type: "TYPE_ALL_IN_3",
      prov: ["上海"],
      sub3: ["生命科学", "物理", "化学", "思想政治", "历史", "地理"],
      //sub2: [],
      mustSelect: 6,
    },
  ],
  defaultSubject: {
    type: "",
    prov: [],
    sub1: [],
    sub2: [],
    mustSelect: 1,
  },
  //当前选中地区的科目
  get subjectFilter() {
    if (!this.curProv) {
      return this.defaultSubject;
    }
    return this.subject.find((item) => item.prov.includes(this.curProv));
  },
  //当前已选的科目
  get curSubjectList() {
    return this.curSubList.map((item) => item.subject);
  },
  //当前已选的科目转接口格式
  //type:0为语数英，1为首选，2为次选，3为不限,整理最终数据
  get showSubList() {
    return this.curSubList.map((item) => {
      const obj = { ...item };
      obj.type = obj.cur;
      delete obj.cur;
      return obj;
    });
  },
  
  setFormData(data) {
    this.formData = {
      ...this.formData,
      ...data,
    };
  },
  resetData() {
    this.curSubList = [];
    this.curProv = "";
    this.noSuport = false;
  },
  spProv(curProv = "") {
    let provSp = "";
    const Prov3word = ["黑龙江", "内蒙古"];
    if (Prov3word.includes(curProv.substring(0, 3))) {
      provSp = curProv.substring(0, 3);
    } else {
      provSp = curProv.substring(0, 2);
    }
    return provSp;
  },
  setCurProv(curProv = "") {
    const blacklist = ["台湾省", "香港特别行政区", "澳门特别行政区"];
    if (blacklist.includes(curProv)) {
      Taro.showToast({ title: "暂不支持港澳台地区", icon: "none" });
      this.curSubList = this.subListInneed;
      this.curProv = "";
      this.noSuport = true;
      return;
    }
    let provSp = this.spProv(curProv);
    console.log(provSp);
    this.curSubList = this.subListInneed;
    this.curProv = provSp;
    this.noSuport = false;
  },
  allInThree(findIndex, params) {
    if (findIndex > -1) {
      this.curSubList.splice(findIndex, 1);
    } else {
      if (this.curSubList.length < 6) {
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
      if (params.cur === 1) {
        if (this.curSubList.filter((f) => f.cur === 1).length > 0) {
          Taro.showToast({ title: "首选科目只能选1个科目", icon: "none" });
          return;
        }
      }
      if (params.cur === 2) {
        if (this.curSubList.filter((f) => f.cur === 2).length > 1) {
          Taro.showToast({ title: "次选科目只能选2个科目", icon: "none" });
          return;
        }
      }
      this.curSubList.push(params);
    }
  },
  twoInOne(findIndex, params) {
    this.curSubList.splice(findIndex, 1);
    this.curSubList.push(params);
  },
  selectSubject({ type = "", cur = "", subject = "" }) {
    console.log("当前选中");
    console.log({ type, cur, subject });
    const findIndex = this.curSubList.findIndex((f) => f.subject === subject);
    switch (type) {
      case "TYPE_ALL_IN_3":
        //多选3
        this.allInThree(findIndex, { cur, subject });
        break;
      case "TYPE_2_AND_4":
        //sub1=>2选一,sub2=>4选2
        this.twoAndFour(findIndex, { cur, subject });
        break;
      case "ZH_2_IN_1":
        this.twoInOne(findIndex, { cur, subject });
        break;
    }
    console.log(this.curSubList.slice());
  },
  //从接口数据中设置选中的科目
  setCurSubList(list) {
    if (list.length > 0) {
      this.curSubList = list.map((n) => {
        const obj = {
          //type 对应 subject 的 sub，语数英默认sub0
          cur: n.type,
          subject: n.subject,
          type: this.subjectFilter.type,
          score: n.score,
        };
        return obj;
      });
    }
  },
  // 修改分数
  setSubjectScore({ index = 0, score = "" }) {
    const newlist = [...this.curSubList]
    newlist[index].score = score;
    this.curSubList = newlist
  },
});

export default subject;
