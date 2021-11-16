import * as d3 from 'd3'
import Layout from './Layout.jsx'
import { roundedLayout, pathLayout, centeredLayout, linearLayout } from './forces/force-layout.js'

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

const getNode = (count = 16) => {
  return [...Array(count)]
    .map(() => ({
      value: d3.randomNormal(30, 10)(),
      x: x(Math.min(Math.max(d3.randomNormal(0.5, 0.15)(), 0), 1)),
      y: y(Math.min(Math.max(d3.randomNormal(0.5, 0.15)(), 0), 1)),
      r: Math.max(20, d3.randomNormal(20, 10)())
    }))
}

// StoryBook CSF格式，同时也是UI组件的描述格式
export default {
  title: '通用',
  name: 'Bubble',
  component: Layout
}

export const 圆形分布 = () => {
  const nodes = roundedLayout(getNode(32), {
    r: 200,
    ad: 3,
    radiusMin: 30,
    radiusMax: 80,
    w: chartParam.width,
    h: chartParam.height
  })

  return <Layout data={nodes} width={chartParam.width} height={chartParam.height} />
}

export const 路径分布 = () => {
  const nodes = pathLayout(getNode(32), {
    path: 'M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z',
    // path: 'M311.114667 371.242667L471.146667 169.098667a52.106667 52.106667 0 0 1 81.706666 0l160.032 202.144 153.152-65.632a52.106667 52.106667 0 0 1 71.541334 58.474666l-89.44 430.933334a112.416 112.416 0 0 1-110.08 89.568H285.941333a112.416 112.416 0 0 1-110.08-89.568l-89.429333-430.933334a52.106667 52.106667 0 0 1 71.541333-58.474666l153.152 65.632zM512 220.608L355.648 418.101333a52.106667 52.106667 0 0 1-61.376 15.552l-140.544-60.234666 84.8 408.586666a48.416 48.416 0 0 0 47.402667 38.581334h452.138666a48.416 48.416 0 0 0 47.402667-38.581334l84.8-408.586666-140.544 60.234666a52.106667 52.106667 0 0 1-61.376-15.552L512 220.608z',
    radiusMin: 30,
    radiusMax: 80,
    w: chartParam.width,
    h: chartParam.height
  })

  return <Layout data={nodes} width={chartParam.width} height={chartParam.height} />
}

export const 中心分布 = () => {
  const nodeData = [...Array(32)]
    .map(() => ({
      value: d3.randomNormal(30, 10)(),
      x: x(Math.min(Math.max(d3.randomNormal(0.5, 0.15)(), 0), 1)),
      y: y(Math.min(Math.max(d3.randomNormal(0.5, 0.15)(), 0), 1)),
      r: Math.max(20, d3.randomNormal(20, 10)())
    }))
  const nodes = centeredLayout(nodeData, {
    radiusMin: 30,
    radiusMax: 80,
    ad: -2,
    w: chartParam.width,
    h: chartParam.height
  })

  return <Layout data={nodes} width={chartParam.width} height={chartParam.height} />
}

export const 水平等边缘间距分布 = () => {
  const nodes = linearLayout(getNode(10), {
    radiusMin: 30,
    radiusMax: 80,
    ad: 10,
    w: chartParam.width,
    h: chartParam.height
  })
  return <Layout data={nodes} width={chartParam.width} height={chartParam.height} />
}

export const 水平等圆心间距分布 = () => {
  const nodes = linearLayout(getNode(10), {
    radiusMin: 30,
    radiusMax: 80,
    al: chartParam.width / 20,
    w: chartParam.width,
    h: chartParam.height
  })
  return <Layout data={nodes} width={chartParam.width} height={chartParam.height} />
}
