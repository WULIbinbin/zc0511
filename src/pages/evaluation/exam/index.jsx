import { Component } from "react";
import { View, Text } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import Taro from "@tarojs/taro";
import { PageView } from "../../../components/index";
import { GetQuestion } from "../../../request/apis/report";
import "./index.scss";

const tabFormateRs = [
  {
    cateKey: "R",
    cateName: "实际型",
    score: 0,
    type: "家里你说了算",
    info:
      "愿意使用工具从事操作性工作，动手能力强，做事手脚灵活，动作协调。偏好于具体任务，不善言辞，做事保守，较为谦虚。缺乏社交能力，通常喜欢独立做事。",
  },
  {
    cateKey: "C",
    cateName: "常规型",
    score: 0,
    type: "非常细心的人，另一半很幸福",
    info:
      "尊重权威和规章制度，喜欢按计划办事，细心、有条理，习惯接受他人的指挥和领导，自己不谋求领导职务。喜欢关注实际和细节情况，通常较为谨慎和保守，缺乏创造性，不喜欢冒险和竞争，富有自我牺牲精神。",
  },
  {
    cateKey: "E",
    cateName: "企业型",
    score: 0,
    type: "你就是传说中的领导",
    info:
      "追求权力、权威和物质财富，具有领导才能。喜欢竞争、敢冒风险、有野心、抱负。为人务实，习惯以利益得失，权利、地位、金钱等来衡量做事的价值，做事有较强的目的性。",
  },
  {
    cateKey: "S",
    cateName: "社会型",
    score: 0,
    type: "没办法，你到处都有朋友",
    info:
      "喜欢与人交往、不断结交新的朋友、善言谈、愿意教导别人。关心社会问题、渴望发挥自己的社会作用。寻求广泛的人际关系，比较看重社会义务和社会道德。",
  },
  {
    cateKey: "A",
    cateName: "艺术型",
    score: 0,
    type: "没错，艺术家就该留长发",
    info:
      "有创造力，乐于创造新颖、与众不同的成果，渴望表现自己的个性，实现自身的价值。做事理想化，追求完美，不重实际。具有一定的艺术才能和个性。善于表达、怀旧、心态较为复杂。",
  },
  {
    cateKey: "I",
    cateName: "研究型",
    score: 0,
    type: "很牛逼（除了头发）",
    info:
      "思想家而非实干家,抽象思维能力强，求知欲强，肯动脑，善思考，不愿动手。喜欢独立的和富有创造性的工作。知识渊博，有学识才能，不善于领导他人。考虑问题理性，做事喜欢精确，喜欢逻辑分析和推理，不断探讨未知的领域。",
  },
];
@inject("store")
@observer
class Index extends Component {
  state = {
    no: 1,
    myResults: {},
    questions: [],
    nums: 60,
    selected:[]
  };

  componentWillMount() {}

  componentDidMount() {
    Taro.showLoading();
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
      selected = this.state.selected;
    if (no >= this.state.nums) {
      // 问题回答结束
      this.finishQuestion(myResults);
      return
      // this.setState({
      //   no: 1,
      // });
    } else {
      if (!myResults[question.cateKey]) {
        myResults[question.cateKey] = 0;
      }
      myResults[question.cateKey] += answer === question.score ? 1 : 0;
      console.log(myResults);
      this.setState({
        no: ++no,
        myResults: myResults,
      });
    }
  }

  handlePrev() {
    let no = this.state.no,
      prevQuestion = this.state.questions[this.state.no - 2],
      myResults = this.state.myResults;
    this.setState({
      no: --no,
      myResults: myResults,
    });
  }

  finishQuestion(res) {
    console.log(res);
  }

  render() {
    const { no, questions } = this.state;
    const len = questions.length;
    const quesInfo = (len > 0 && questions[no]) || {};
    const precent = (no / len) * 100;
    console.log(no);
    return (
      <PageView bgColor="#f7f7f7">
        <View className="b-eva-exam-main">
          <View className="b-eva-exam-title">
            {no + 1}.{quesInfo.title}
          </View>
          <View className="b-eva-exam-options">
            <View
              className="b-eva-exam-option"
              onClick={this.handleAnswer.bind(this, 1)}
            >
              是的
            </View>
            <View
              className="b-eva-exam-option"
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
          <View className="b-eva-exam-button">上一题</View>
        </View>
      </PageView>
    );
  }
}

export default Index;
