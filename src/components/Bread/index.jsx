import { View, Image } from '@tarojs/components'
import './index.scss'
import ArrowRight from '../../static/image/arrow-right.png'

function Bread({ items = [] }) {
  return (
    <View className='b-bread'>
      <View className='bread'>
        {
          items.map((n, i) => (
            <>
              <View className='bread-item'>{n}</View>
              {i < items.length - 1 && <Image className='bread-arrow' src={ArrowRight}></Image>}
            </>
          ))
        }
      </View>
    </View>
  )
}

export default Bread