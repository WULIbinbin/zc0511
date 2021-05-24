import { Component } from "react";
import {
  View,
  Image,
  ScrollView,
  Text,
  Picker,
  Video,
} from "@tarojs/components";
import { observer, inject } from "mobx-react";
import { PickerLabel, Table, Tabbar } from "../../../components/index";
import {
  GetCollegeDetail,
  GetCollegeScoreLine,
} from "../../../request/apis/college";
import "./index.scss";

const tabs = ["学校简介", "录取情况"];
const thead = [
  {
    key: "Year",
    name: "年份",
  },
  {
    key: "AdmissionBatch",
    name: "批次",
  },
  {
    key: "LowestScore_LowestRank",
    name: "最低分/位次",
  },
  {
    key: "TypeName",
    name: "选科要求",
  },
];
@inject("store")
@observer
class Index extends Component {
  state = {
    activeTab: "学校简介",
    detail: {
      CollegeTags: [],
    },
    name: "",
    params: {
      enrollprovince: "北京",
      type: "综合",
      year: "",
    },
    scorelineData: [],
  };

  componentWillMount() {}

  componentDidMount() {
    const {
      options: { name },
    } = getCurrentPages()[getCurrentPages().length - 1];
    GetCollegeDetail(name).then((res) => {
      let { CollegeTags } = res.data;
      if (!!CollegeTags) {
        CollegeTags = CollegeTags.substring(1, CollegeTags.length - 1)
          .split(",")
          .map((n) => {
            return n.replace(" ", "");
          });
      }
      this.setState(
        {
          name,
          detail: { ...res.data, CollegeTags },
        },
        () => {
          this.getScoreLine(name, this.state.params);
        }
      );
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleTabChange(activeTab) {
    console.log(activeTab);
    this.setState({
      activeTab,
    });
  }

  getScoreLine(name, params) {
    GetCollegeScoreLine(name, params).then((res) => {
      this.setState({
        scorelineData: res.data.map((n) => {
          return {
            ...n,
            LowestScore_LowestRank: `${n.LowestScore}/${n.LowestRank}`,
          };
        }),
      });
    });
  }

  handlePickerChange(key, e) {
    const { value } = e.detail;
    const { params, name } = this.state;
    const { Common } = this.props.store;
    if (key === "enrollprovince") {
      params[key] = Common.province[value];
    } else {
      params[key] = Common.subtype[value];
    }
    this.setState(
      {
        params,
      },
      () => {
        this.getScoreLine(name, this.state.params);
      }
    );
  }

  render() {
    const { Common } = this.props.store;
    const { activeTab, detail, scorelineData, params } = this.state;
    return (
      <ScrollView scrollY className="b-college-detail">
        <View className="college-item">
          <Image className="logo" src={detail.CoverImage}></Image>
          <View className="info">
            <View className="name">{detail.CollegeName}</View>
            <View className="labels">
              {detail.CollegeTags.map((label) => (
                <View className="label">{label}</View>
              ))}
            </View>
          </View>
        </View>
        <View className="body">
          <View className="tab-bar">
            <Tabbar
              tabs={tabs}
              activeTab={activeTab}
              onChange={({ target }) => {
                this.handleTabChange(target);
              }}
            />
          </View>
          {activeTab === "学校简介" && (
            <View className="tab-pane">
              {/* <View className="video-view">
                <Video></Video>
              </View> */}
              <View className="details">
                <Text decode>{detail.Intro}</Text>
                <Text decode>{detail.Expenses}</Text>
              </View>
            </View>
          )}
          {activeTab === "录取情况" && (
            <View className="tab-pane">
              <View className="admission">
                <View className="filter">
                  <Picker
                    range={Common.province}
                    onChange={this.handlePickerChange.bind(
                      this,
                      "enrollprovince"
                    )}
                  >
                    <PickerLabel value={params.enrollprovince} />
                  </Picker>
                  <Picker
                    range={Common.subtype}
                    onChange={this.handlePickerChange.bind(this, "type")}
                  >
                    <PickerLabel value={params.type} />
                  </Picker>
                </View>
                <View className="table">
                  <Table thead={thead} tbody={scorelineData} />
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}

export default Index;
