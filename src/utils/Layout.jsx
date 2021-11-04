
export default ({
  data,
  width,
  height
}) => {
  return (
    <div
      className='layout-root'
      style={{
        width: width + 'px',
        height: height + 'px',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
      }}
    >
      {data && data.map((d, i) => <div
        key={i} style={{
          borderRadius: '100%',
          left: d.x + 'px',
          top: d.y + 'px',
          position: 'absolute',
          width: d.r + 'px',
          height: d.r + 'px',
          background: '#ccc'
        }}
                                  />
      )}
    </div>
  )
}
