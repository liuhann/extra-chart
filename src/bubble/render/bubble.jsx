
const initStyles = {
  basic: d => {
    return Object.assign({
      opactiy: 0,
      transformOrigin: 'center center',
      position: 'absolute',
      borderRadius: '100%',
      height: d.r + 'px',
      width: d.r + 'px'
    })
  }
}

export const renderBubble = (d, styleName, datas, options) => {
  let style = null
  if (typeof styleName === 'string') {
    style = initStyles[styleName](d)
  } else if (typeof styleName === 'function') {
    style = styleName(d)
  }

  style.boxShadow = options.boxShadow
  style.background = options.background

  return (
    <div
      data-seq={'bubble-' + d.i}
      className='bubble'
      key={d.i}
      style={style}
    >
      {d.label && <div className='bubble-title'>{d.label}</div>}
      {d.desc && <div className='bubble-desc'>{d.desc}</div>}
    </div>
  )
}
