export const shadows = [
  'rgba(149, 157, 165, 0.2) 0px 8px 24px',
  'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  'rgba(44, 187, 99, .2) 0 -25px 18px -14px inset,rgba(44, 187, 99, .15) 0 1px 2px,rgba(44, 187, 99, .15) 0 2px 4px,rgba(44, 187, 99, .15) 0 4px 8px,rgba(44, 187, 99, .15) 0 8px 16px,rgba(44, 187, 99, .15) 0 16px 32px',
  'rgba(0, 0, 0, 0.16) 0px 1px 4px',
  'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  'inset 2px 2px 2px 0px rgba(255,255,255,.5),7px 7px 20px 0px rgba(0,0,0,.1),4px 4px 5px 0px rgba(0,0,0,.1)',
  '0 14px 28px  rgba(0,0,0,0.25), 10px 0 10px  rgba(0,0,0,0.22)',
  '0 4px 12px  rgba(0, 0, 0, 0.13)',
  '0 4px 16px  rgba(17,17,26,0.1), 56px 3.625rem 81px 51px rgba(126, 126, 194, 0.05)',
  'inset 0 60px 50px -50px rgba(50, 50, 93, 0.35),inset 0 60px 50px -50px rgba(50, 50, 93, 0.35)',
  '0 10px 50px  rgba(0,0,0,0.1)',
  '0 6px 12px -2px rgba(50,50,93,0.25), 0 3px 7px -3px rgba(0,0,0,0.3)',
  '5px 5px 0  rgba(76,40,187,0.4), 10px 10px 0  rgba(76,40,187,0.3), 15px 15px 0  rgba(76,40,187,0.2), 20px 20px 0  rgba(76,40,187,0.1), 25px 25px 0  rgba(76,40,187,0.05),inset 0 0 0  #8545ec, 5px 5px 0  rgba(76,40,187,0.4), 10px 10px 0  rgba(76,40,187,0.3), 15px 15px 0  rgba(76,40,187,0.2), 20px 20px 0  rgba(76,40,187,0.1), 25px 25px 0  rgba(76,40,187,0.05), 25px 25px 0  rgba(76,40,187,0.05),inset 0 0 0  #8545ec,inset 5px 5px 0  rgba(76,40,187,0.4)',
  '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
  '0 0 0 1px rgba(0,0,0,0.05),inset 15px 0 0 1px rgb(209,213,219)',
  '0 1px 6rem 0.4375px rgba(0,0,0,0.1)',
  '0 3px 8px  rgba(0,0,0,0.24), 0 0 0  #793e3e',
  '0 4px 16px  rgba(17,17,26,0.1), 0 8px 32px  rgba(17,17,26,0.05)'
]

const shadowOptions = {}

shadows.forEach((value, i) => {
  Object.assign(shadowOptions, {
    [value]: '样式' + (i + 1)
  })
})

export const shadowProp = {
  name: 'boxShadow',
  label: '阴影',
  type: 'string',
  control: 'select',
  options: shadowOptions,
  value: ''
}
