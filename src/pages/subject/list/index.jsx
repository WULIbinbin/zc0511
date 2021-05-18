import { Component } from 'react'
import { View ,ScrollView} from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { PageView } from '../../../components/index'
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
      <ScrollView className='b-subject-lis'></ScrollView>
    )
  }

}

export default Index