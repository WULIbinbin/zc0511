import { Component } from 'react'
import { View, Input, Image, ScrollView } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { PickerSelect } from '../../../components/index'
import './index.scss'

import SearchIcon from '../../../static/image/search.png'

@inject('store')
@observer
class Index extends Component {

  state = {
    showPicker: null,
    isShowPicker: false,
    pickerRange: []
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handlePicker(e) {
    console.log(e)

  }

  render() {
    const items = new Array(20).fill({})
    return (
      <View className='b-lib-search'>
        <View className='options'>
          <View className='search'>
            <Image className='icon' src={SearchIcon}></Image>
            <Input className='input' placeholder='搜索大学'></Input>
          </View>
          <View className='pickers'>
            <PickerSelect onChange={this.handlePicker} />
          </View>
        </View>
        <ScrollView scrollY className='result'>
          {
            items.map(n => (
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
                <View className='local'>北京</View>
              </View>
            ))
          }
        </ScrollView>
      </View>
    )
  }

}

export default Index