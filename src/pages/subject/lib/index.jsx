import { Component } from 'react'
import { View, ScrollView } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { Search, Tabbar, PageView } from '../../../components/index'
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
    const { activeTab } = this.state
    return (
      <PageView>
        <View className='b-subject'>
          <Search />
          <Tabbar tabs={tabs} activeTab={activeTab} onChange={({ target }) => {
            this.handleTabChange(target)
          }} />
          <View className='main'>
            <ScrollView className='left'>
              <View className='faculty'></View>
            </ScrollView>
            <ScrollView className='right'>

            </ScrollView>
          </View>
        </View>
      </PageView>
    )
  }

}

export default Index