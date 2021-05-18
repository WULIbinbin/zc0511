import { Component } from 'react'
import { View, ScrollView } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { Search, Tabbar } from '../../../components/index'
import './index.scss'

@inject('store')
@observer
class Index extends Component {

  state = {
    activeTab: '本科专业'
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
    const tabs = ['本科专业', '专科专业']
    const left = ['法学', '经济学', '教育学', '管理学', '理学']
    const right = ['财政学类', '经济学类', '金融学类', '其他']
    const { activeTab } = this.state
    return (
      <View className='b-subject-lib'>
        <Search />
        <Tabbar tabs={tabs} activeTab={activeTab} onChange={({ target }) => {
          this.handleTabChange(target)
        }} />
        <View className='main'>
          <ScrollView className='left'>
            <View className='info'>
              {
                left.map((n, i) => (
                  <View className={`item ${i === 0 && 'selected'}`}>
                    <View className={`value`}>{n}</View>
                  </View>
                ))
              }
            </View>
          </ScrollView>
          <ScrollView className='right'>
            <View className='b-bottom-line title'>经济学</View>
            <View className='info'>
              {
                right.map(n => (
                  <View className='item'>
                    <View className='value'>{n}</View>
                  </View>
                ))
              }
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }

}

export default Index