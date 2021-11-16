const commonProps = [{
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
  name: 'ad',
  type: 'number',
  label: '边缘间距',
  value: 20
}, {
  name: 'entranceEasing',
  type: 'string',
  label: '进入曲线',
  value: 'spring(1, 80, 10, 0)'
}, {
  name: 'entranceStager',
  type: 'number',
  label: '进入交错',
  value: 200
}]

export {
  commonProps
}
