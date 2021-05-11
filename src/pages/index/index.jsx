import { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'

import './index.less'


@inject('store')
@observer
class Index extends Component {
  config = {
    navigationStyle: 'custom',
    usingComponents: {
      'navbar': '../../components/CustomNavigator/index'
    },
  }
  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='index'>
        <navbar />
      </View>
    )
  }
}

export default Index
