import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const  BarChart = ({
  title
}) => {
  const chartRef = useRef(null)
  useEffect(()=>{
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);
    const option = {
      title: {
        text:title
      },
      xAxis: {
        type: 'category',
        data: ['Vue', 'React', 'Auguarl']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150],
          type: 'bar'
        }
      ]
    };

    option && myChart.setOption(option);
  },[title])
  return <div ref={chartRef} style={{height:400,width:500}}></div>
}
export default  BarChart