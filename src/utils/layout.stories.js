import * as d3 from 'd3'
import Layout from './Layout.jsx'
import { roundedLayout, pathLayout } from './force-layout.js'

const chartParam = ({
  width: 1200,
  height: 800,
  margin: {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
    center: 150
  }
})

const x = d3.scaleLinear()
  .domain([0, 1])
  .range([chartParam.margin.left, chartParam.width - chartParam.margin.right])

const y = d3.scaleLinear()
  .domain([0, 1])
  .range([chartParam.height - chartParam.margin.bottom, chartParam.margin.top])

const r = d3.scaleLinear()
  .domain([0, 1])
  .range([chartParam.margin.center,
    Math.min(chartParam.width / 2 - Math.max(chartParam.margin.left, chartParam.margin.right),
      chartParam.height / 2 - Math.max(chartParam.margin.top, chartParam.margin.bottom))])

const nodeData = [...Array(16)]
  .map(() => ({
    x: x(Math.min(Math.max(d3.randomNormal(0.5, 0.15)(), 0), 1)),
    y: y(Math.min(Math.max(d3.randomNormal(0.5, 0.15)(), 0), 1)),
    r: Math.max(20, d3.randomNormal(20, 10)())
  }))

// StoryBook CSF格式，同时也是UI组件的描述格式
export default {
  title: '通用',
  name: 'Bubble',
  component: Layout
}

export const 圆形分布 = () => {
  const nodes = roundedLayout(nodeData, {
    r: 200,
    w: chartParam.width,
    h: chartParam.height
  })

  return <Layout data={nodes} width={chartParam.width} height={chartParam.height} />
}

export const 路径分布 = () => {
  const svg = d3.create('svg').style('width', '600px').style('height', '600px')
    .attr('viewBox', [0, 0, 1024, 1024])
    .attr('preserveAspectRatio', true)

  const g = svg.append('g')
  const path = g.append('path').attr('d', 'M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z')

  document.body.appendChild(svg.node())

  const nodes = pathLayout(nodeData, {
    path: path.node(),
    r: 200,
    w: chartParam.width,
    h: chartParam.height
  })

  return <Layout data={nodes} width={chartParam.width} height={chartParam.height} />
}
