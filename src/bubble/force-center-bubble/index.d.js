import ForceCenterBubble from './ForceCenterBubble.jsx'
import { shadowProp } from '../render/box-shadows.js'
import { gradientProp } from '../render/backgrounds.js'
import { bubbleProps } from '../render/bubble-props.js'

// StoryBook CSF格式，同时也是UI组件的描述格式
export default {
  title: '气泡图/聚集图',
  name: 'ForceCenterBubble',
  component: ForceCenterBubble,
  // 可配置属性列表，具体规则看样例
  props: [{
    name: 'values',
    type: 'array',
    value: [45, 23, 102, 43, 55, 82, 69]
  }, ...bubbleProps,
  shadowProp,
  gradientProp
  ],
  size: {
    width: 600,
    height: 360
  }
}
