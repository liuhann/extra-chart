import Bubble from './Bubble.jsx'

// StoryBook CSF格式，同时也是UI组件的描述格式
export default {
  title: '气泡图组件',
  name: 'Bubble',
  component: Bubble,
  // 可配置属性列表，具体规则看样例
  props: [{
    name: 'values',
    type: 'array',
    value: [45, 23, 102, 43, 55, 82, 69]
  }],
  size: {
    width: 600,
    height: 360,
  }
}
