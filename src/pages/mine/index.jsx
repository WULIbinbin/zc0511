import { Component } from 'react'
import { View } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import './index.scss'

@inject('store')
@observer
class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View></View>
    )
  }

}

export default Index