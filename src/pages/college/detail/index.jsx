import { Component } from 'react'
import { View, Image, ScrollView, Video } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { PickerLabel } from '../../../components/index'
import './index.scss'

@inject('store')
@observer
class Index extends Component {

  state = {
    activeTab: '录取情况'
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleTabChange(activeTab) {
    this.setState({
      activeTab
    })
  }

  render() {
    const tabs = ['学校简介', '录取情况']
    const { activeTab } = this.state
    return (
      <ScrollView scrollY className='b-college-detail'>
        <View className='college-item'>
          <Image className='logo'></Image>
          <View className='info'>
            <View className='name'>北京大学</View>
            <View className='labels'>
              {
                ['综合类', '985/211', '双一流', '公办'].map(label => (<View className='label'>{label}</View>))
              }
            </View>
          </View>
        </View>
        <View className='body'>
          <View className='tab-bar'>
            {
              tabs.map(t => (
                <View
                  className={`tab-item ${t === activeTab && 'active'}`}
                  onClick={this.handleTabChange.bind(this, t)}>
                  {t}
                </View>
              ))
            }
          </View>
          {
            activeTab === '学校简介' &&
            <View className='tab-pane'>
              <View className='video-view'>
                <Video></Video>
              </View>
              <View className='details'>
                北京大学（北大，Peking University），创建于1898年，坐落于北京市，前身是京师大学堂。该校是中华人民共和国教育部直属的中国近现代第一所国立综合性大学。北京大学位列“211工程”“985工程”“世界一流大学和一流学科”，且入选“学位授权自主审核单位”“基础学科拔尖学生培养试验计划”“高等学校创新能力提升计划”“高等学校学科创新引智计划”，是九校联盟、亚洲大学联盟等联盟成员。
                北京大学其学脉可追溯自晚清时期的京师大学堂，1912年曾更名国立北京大学。1937年，抗日战争爆发后，北大与清华、南开合并组建国立西南联合大学，1946年，迁回北平复校。1952年，经全国院系调整后并迁入原燕京大学校园（燕园）。2000年，北京医科大学回归，成为北京大学医学部，组建了新的北京大学。
            </View>
            </View>
          }
          {
            activeTab === '录取情况' &&
            <View className='tab-pane'>
              <View className='admission'>
                <View className='filter'>
                  <PickerLabel />
                  <PickerLabel />
                </View>
                <View className='table'></View>
              </View>
            </View>
          }
        </View>
      </ScrollView>
    )
  }

}

export default Index