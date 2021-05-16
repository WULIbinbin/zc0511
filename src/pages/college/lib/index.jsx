import { Component } from 'react'
import { View, Input, Image, ScrollView } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { PickerSelect } from '../../../components/index'
import './index.scss'

import SearchIcon from '../../../static/image/search.png' 

@inject('store')
@observer
class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handlePicker(e){
    console.log(e)
  }

  render() {
    return (
      <View className='b-lib-search'>
        <View className='options'>
          <View className='search'>
            <Image className='icon' src={SearchIcon}></Image>
            <Input className='input' placeholder='搜索大学'></Input>
          </View> 
          <View className='pickers'>
            <PickerSelect onChange={this.handlePicker}/>
          </View> 
        </View>  
        <ScrollView className='result'></ScrollView>  
      </View>
    )
  }

}

export default Index