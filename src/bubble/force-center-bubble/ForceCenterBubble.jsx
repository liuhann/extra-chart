import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { renderBubble } from '../render/bubble.jsx'

/**
 * 聚集气泡图
 */
export default ({
  values = [45, 23, 102, 43, 55, 82, 69],
  // Average Distance
  ad = 20,
  // 最大半径
  radiusMax = 60,
  // 最小半径
  radiusMin = 50,
  // 进入动画相关
  entranceDelay = 100,
  entranceEasing = 'spring(1, 80, 10, 0)',
  boxShadow = '',
  background = '#eee',
  width = 420,
  height = 360
}) => {
  const ref = useRef()
  const nodes = values.map((value, i) => {
    return {
      i,
      r: value,
      x: Math.random() * width,
      y: Math.random() * height
    }
  })

  nodes.sort((a, b) => {
    return a.r - b.r
  })
  const simulation = d3.forceSimulation(nodes)
    .force('collide', d3.forceCollide().radius(d => d.r / 2 + 2).iterations(3))
    .force('manyBody', d3.forceManyBody().strength(30))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .alphaTarget(0.7) // stay hot
    .velocityDecay(0.1) // low friction
    .tick(2000)

  useEffect(() => {
    simulation.on('tick', () => {
      if (ref && ref.current) {
        simulation.nodes().forEach((d, i) => {
          ref.current.querySelector('[data-seq="bubble-' + i + '"]').style.transform = `translate(${d.x - d.r / 2}px, ${d.y - d.r / 2}px)`
        })
      }
      simulation.stop()
    })
  })

  const options = {
    boxShadow,
    background
  }

  return (
    <div
      ref={ref}
      style={{
        width: width + 'px',
        height: height + 'px',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
      }}
    >
      {nodes.map((d, i) => renderBubble(d, 'basic', nodes, options))}
    </div>
  )
}
