import { View } from '@tarojs/components'
import './index.scss'

function Table({ thead = [], tbody = [] }) {
  return (
    <View className='b-table'>
      <View className='thead'>
        {
          [...thead].map(th => (
            <View className='th'>{th.name}</View>
          ))
        }
      </View>
      <View className='tbody'>
        {
          tbody.map(item => (
            <View className='tr'>
              {
                [...thead].map(head => (
                  <View className='td'>{item[head.key]}</View>
                ))
              }
            </View>
          ))
        }
      </View>
    </View>
  )
}

export default Table