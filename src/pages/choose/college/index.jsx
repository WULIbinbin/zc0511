import { Component } from "react";
import { View, ScrollView } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import Taro from "@tarojs/taro";
import { PickerSelect, Table, CollegeItem } from "../../../components/index";
import { SearchSubject, GetCollegeDetail } from "../../../request/apis/college";
import { getScrollViewHeight } from "../../../utils/tool";
import "./index.scss";

@inject("store")
@observer
class Index extends Component {
  state = {
    params: {},
    tbody: [],
    collegeDetail: {},
  };
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {
    const {
      options: { subStr, fromProvince, schoolName, majorName },
    } = getCurrentPages()[getCurrentPages().length - 1];
    Taro.showLoading();
    const obj = {};
    const params = {
      pageNum: 1,
      pageSize: 20,
    };
    subStr && (params.subStr = subStr);
    fromProvince && (params.fromProvince = fromProvince);
    schoolName && (params.schoolName = schoolName);
    majorName && (params.majorName = majorName);
    obj.params = params;
    this.setState(obj, () => {
      this.getList();
      if (!!params.schoolName) {
        GetCollegeDetail(params.schoolName).then((res) => {
          const collegeDetail = res.data;
          if (!!collegeDetail.CollegeTags) {
            collegeDetail.CollegeTags = collegeDetail.CollegeTags.substring(
              1,
              collegeDetail.CollegeTags.length - 1
            )
              .split(",")
              .map((n) => {
                return n.replace(" ", "");
              });
          }
          this.setState({
            collegeDetail: { ...collegeDetail },
          });
        });
      }
    });
  }

  componentDidHide() {}

  handleChange(data) {
    console.log(data);
    if (!data) return;
    const params = {};
    const prov = data["院校地区"];
    const level = data["院校层次"];
    if (prov && prov.length > 0) {
      params.province = prov.join(",");
    }
    if (level && level.length > 0) {
      if (level.includes("双一流")) {
        params.tag1 = 1;
      } else {
        params.tag1 = 0;
      }
      if (level.includes("985")) {
        params.tag2 = 1;
      } else {
        params.tag2 = 0;
      }
      if (level.includes("211")) {
        params.tag3 = 1;
      } else {
        params.tag3 = 0;
      }
      if (level.includes("本科") && !level.includes("专科")) {
        params.schoolType = "本科";
      } else if (!level.includes("本科") && level.includes("专科")) {
        params.schoolType = "专科";
      } else {
        params.schoolType = "";
      }
    }
    this.setState(
      {
        params: {
          ...this.state.params,
          ...params,
          pageNum:1
        },
        tbody: [],
      },
      () => {
        this.getList();
      }
    );
  }

  getList() {
    let { params, tbody } = this.state;
    Taro.showLoading();
    SearchSubject(params)
      .then((res) => {
        Taro.hideLoading();
        const { list, pages } = res.data;
        const newlist = list.map((n) => {
          return {
            ...n,
            includes: "-",
            sub: ["不限", "物理", "历史"][n.sub] || "不限",
          };
        });
        tbody = tbody.concat(newlist);
        if (params.pageNum < pages) {
          params.pageNum += 1;
        }
        this.setState({
          tbody,
          params,
        });
      })
      .catch((err) => {
        console.log(err);
        Taro.showToast({ title: "服务器繁忙，稍后重试", icon: "none" });
      });
  }

  goDetail(name) {
    Taro.navigateTo({
      url: `/pages/college/detail/index?name=${name}`,
    });
  }

  render() {
    const thead = [
      {
        key: "collegeName",
        name: "院校名称",
      },
      {
        key: "majorName",
        name: "专业名称",
      },
      {
        key: "includes",
        name: "包含专业",
      },
      {
        key: "sub",
        name: "选科要求",
      },
    ];
    const {
      Common: { province, level },
    } = this.props.store;
    const {
      tbody,
      collegeDetail,
      params: { subStr, majorName },
    } = this.state;
    const pickers = [
      {
        label: "院校地区",
        range: province,
      },
      {
        label: "院校层次",
        range: level,
      },
    ];
    let curTopVisiteHeight = 0;
    if (!!subStr || !!majorName) {
      curTopVisiteHeight = 90;
    }
    const scrollViewHeight = getScrollViewHeight(curTopVisiteHeight);
    return (
      <View className="b-choose-college">
        {curTopVisiteHeight > 0 && (
          <View className="top-bar">
            <PickerSelect
              style={{ padding: "0 140rpx" }}
              range={pickers}
              onChange={this.handleChange.bind(this)}
            />
          </View>
        )}
        <ScrollView
          style={{ height: scrollViewHeight }}
          scrollY
          className="main"
          scrollWithAnimation
          onScrollToLower={this.getList.bind(this)}
          lowerThreshold={200}
        >
          {collegeDetail.CollegeName && (
            <CollegeItem
              icon={collegeDetail.CoverImage}
              name={collegeDetail.CollegeName}
              labels={collegeDetail.CollegeTags}
              local={collegeDetail.Province}
              goto={this.goDetail.bind(this, collegeDetail.CollegeName)}
            />
          )}
          <View className="list">
            <Table thead={thead} tbody={tbody} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Index;
