export const backgrounds = [
  'linear-gradient(315deg, #4dccc6 0%, #96e4df 74%)',
  'radial-gradient(circle, lightblue, deepskyblue)',
  'linear-gradient(-180deg, #69b7eb, #b3dbd3, #f4d6db)',
  'linear-gradient(to right, #f6d365 0%, #fda085 51%, #f6d365 100%)',
  'linear-gradient(to right, #fbc2eb 0%, #a6c1ee 51%, #fbc2eb 100%)',
  'linear-gradient(to right, #84fab0 0%, #8fd3f4 51%, #84fab0 100%)',
  'linear-gradient(to right, #a1c4fd 0%, #c2e9fb 51%, #a1c4fd 100%)',
  'linear-gradient(to right, #ffecd2 0%, #fcb69f 51%, #ffecd2 100%)',
  'linear-gradient(-180deg, #cfecd0, #ffc5ca)',
  'linear-gradient(90deg, #f598a8, #f6edb2)',
  'linear-gradient(90deg, #ee5c87, #f1a4b5, #d587b3)',
  'linear-gradient(90deg, #b9deed, #efefef)',
  'linear-gradient(90deg, #aea4e3, #d3ffe8)',
  'linear-gradient(90deg, #faf0cd, #fab397)',
  'linear-gradient(90deg, #cfecd0, #a0cea7, #9ec0db)'
]

const gradientOptions = {}

backgrounds.forEach((value, i) => {
  Object.assign(gradientOptions, {
    [value]: '样式' + (i + 1)
  })
})

export const gradientProp = {
  name: 'background',
  label: '背景色',
  type: 'string',
  control: 'select',
  options: gradientOptions,
  value: 'linear-gradient(90deg, #69b7eb, #b3dbd3, #f4d6db)'
}
