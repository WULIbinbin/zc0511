import { Component } from "react";
import { View, Text } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import Taro from "@tarojs/taro";
import { PageView } from "../../../components/index";
import { GetQuestion, SubQuestion } from "../../../request/apis/report";
import "./index.scss";

@inject("store")
@observer
class Index extends Component {
  state = {
    no: 1,
    myResults: {},
    questions: [],
    nums: 60,
    history: [],
    checked: null,
  };

  componentWillMount() {}

  componentDidMount() {
    Taro.showLoading({title:'加载中'});
    GetQuestion().then((res) => {
      Taro.hideLoading();
      this.setState({
        questions: res,
      });
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleAnswer(answer) {
    let no = this.state.no,
      question = this.state.questions[this.state.no - 1],
      myResults = this.state.myResults,
      history = this.state.history,
      checked = this.state.checked;
    if (checked !== null) return;
    this.setState({
      checked: answer,
    });
    if (no >= this.state.nums) {
      // 问题回答结束
      this.finishQuestion(myResults);
      return;
    } else {
      if (!myResults[question.cateKey]) {
        myResults[question.cateKey] = 0;
      }
      myResults[question.cateKey] += answer === question.score ? 1 : 0;
      history.push({
        title: question.title,
        cateKey: question.cateKey,
        score: answer,
      });
      console.log(myResults);
      setTimeout(() => {
        this.setState({
          no: ++no,
          myResults: myResults,
          history,
          checked: null,
        });
      }, 0);
    }
  }

  handlePrev() {
    let no = this.state.no,
      prevQuestion = this.state.history[this.state.no - 2],
      myResults = this.state.myResults,
      history = this.state.history;
    if (no === 1) {
      Taro.showToast({ title: "当前是第一题", icon: "none" });
      return;
    }
    myResults[prevQuestion.cateKey] -= prevQuestion.score;
    history.pop();
    this.setState({
      no: --no,
      myResults: myResults,
      history,
    });
  }

  finishQuestion(myResults) {
    Taro.showLoading({ mask: true });
    SubQuestion({
      type: this.filterType(myResults),
      hollandStr: JSON.stringify(myResults),
    })
      .then((res) => {
        console.log(res)
        Taro.hideLoading();
        this.props.store.Tutor.getHolland();
        if (res.status == 0) {
          Taro.navigateBack();
        } else {
          this.setState({ checked: null });
          Taro.showToast({ title: "提交失败，请重试", icon: "none" });
        }
      })
      .catch((err) => {
        Taro.hideLoading();
        this.setState({ checked: null });
        Taro.showToast({ title: "提交失败，请重试", icon: "none" });
      });
  }

  filterType(myResults) {
    const obj2arr = Object.keys(myResults).map((key) => {
      return {
        score: myResults[key],
        key,
      };
    });
    return obj2arr
      .sort((a, b) => {
        return b.score - a.score;
      })
      .splice(0, 3)
      .map((m) => m.key)
      .join("");
  }

  render() {
    const { no, questions, checked } = this.state;
    const len = questions.length;
    const quesInfo = (len > 0 && questions[no - 1]) || {};
    const precent = (no / len) * 100;
    return (
      <PageView bgColor="#f7f7f7">
        <View className="b-eva-exam-main">
          <View className="b-eva-exam-title">
            {no}.{quesInfo.title}
          </View>
          <View className="b-eva-exam-options">
            <View
              className={`b-eva-exam-option ${checked === 1 && "checked"}`}
              onClick={this.handleAnswer.bind(this, 1)}
            >
              是的
            </View>
            <View
              className={`b-eva-exam-option ${checked === 0 && "checked"}`}
              onClick={this.handleAnswer.bind(this, 0)}
            >
              不是
            </View>
          </View>
        </View>
        <View className="b-eva-exam-bottom">
          <View className="b-eva-exam-process">
            <View className="b-eva-exam-process-top">
              <View className="b-eva-exam-process-title">完成度</View>
              <View className="b-eva-exam-process-desc">
                <Text>{no}</Text>/{len}
              </View>
            </View>
            <View className="b-eva-exam-process-bg">
              <View
                className="b-eva-exam-process-bar"
                style={`width:${precent}%`}
              ></View>
            </View>
          </View>
          <View
            className="b-eva-exam-button"
            onClick={this.handlePrev.bind(this)}
          >
            上一题
          </View>
        </View>
      </PageView>
    );
  }
}

export default Index;
