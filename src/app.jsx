import { Component } from 'react'
import { Provider } from 'mobx-react'

import Store from './store/index'

import './app.less'

class App extends Component {
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 就是要渲染的页面
  render () {
    return (
      <Provider store={Store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
