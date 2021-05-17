import { View } from '@tarojs/components'
import { useState } from 'react'
import './index.scss'

function Tabbar({ tabs = [], activeTab = '', onChange = null }) {
  const [active, setActive] = useState(activeTab)
  const handleTabChange = (target, index) => {
    setActive(target)
    onChange && onChange({ target, index })
  }
  return (
    <View className='b-tab-bar'>
      {
        tabs.map((t, i) => (
          <View
            className={`tab-item ${t === active && 'active'}`}
            onClick={() => {
              handleTabChange(t, i)
            }}>
            {t}
          </View>
        ))
      }
    </View>
  )
}

export default Tabbar