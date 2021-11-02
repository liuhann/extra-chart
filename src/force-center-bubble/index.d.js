import ForceCenterBubble from './ForceCenterBubble.jsx'

// StoryBook CSF格式，同时也是UI组件的描述格式
export default {
  title: '聚集气泡图',
  name: 'ForceCenterBubble',
  component: ForceCenterBubble,
  // 可配置属性列表，具体规则看样例
  props: [{
    name: 'values',
    type: 'array',
    value: [45, 23, 102, 43, 55, 82, 69]
  }, {
    name: 'layoutType',
    label: '分布方式',
    type: 'string',
    control: 'select',
    options: {
      divideE2e: '边缘等距平分',
      divideC2c: '圆心等距平分',
      fixedC2c: '固定等圆心距离',
      fixedE2e: '固定等边缘距离'
    },
    value: 'divideE2e'
  }, {
    name: 'radiusMax',
    type: 'number',
    label: '最大直径',
    value: 60
  }, {
    name: 'radiusMin',
    type: 'number',
    label: '最小直径',
    value: 20
  }, {
    name: 'al',
    type: 'number',
    label: '间距',
    value: 40
  }, {
    name: 'ad',
    type: 'number',
    label: '边缘间距',
    value: 20
  }, {
    name: 'entranceTranslateX',
    type: 'string',
    label: '自x进入',
    value: '-=100'
  }, {
    name: 'entranceTranslateY',
    type: 'string',
    label: '自y进入',
    value: '-=0'
  }],
  size: {
    width: 600,
    height: 360
  }
}
