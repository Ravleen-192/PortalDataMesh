import { useTheme } from '@mui/system';
import ReactEcharts from 'echarts-for-react';

const LineChart = ({ height, color = [] }) => {
  const theme = useTheme();

  const option = {
    grid: { top: '10%', bottom: '10%', left: '5%', right: '5%' },
    legend: {
      itemGap: 20,
      icon: 'circle',
      textStyle: { color: 'black', fontSize: 13, fontFamily: 'roboto' },
    },
    xAxis: {
      type: 'category',
      data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      axisLine: { show: false },
      axisTick: { show: true },
      axisLabel: {
        fontSize: 14,
        fontFamily: 'roboto',
        color: 'black',
      },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: true },
      splitLine: {
        lineStyle: { color: 'blue', opacity: 0.15 },
      },
      axisLabel: { color: 'blue', fontSize: 13, fontFamily: 'roboto' },
    },
    series: [
      {
        data: [30, 40, 20, 50, 40, 80, 90],
        type: 'line',
        stack: 'Compliance',
        name: 'Compliance',
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 },
      },
      {
        data: [20, 50, 15, 50, 30, 70, 95],
        type: 'line',
        stack: 'Data validation',
        name: 'Data Valdation',
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 },
      },
      {
        data: [30, 60, 25, 75, 45, 85, 98],
        type: 'line',
        stack: 'Data quality',
        name: 'Data quality',
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 },
      },
      {
        data: [50, 80, 55, 85, 65, 95, 98],
        type: 'line',
        stack: 'Storage',
        name: 'Storage',
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 },
      },
    ],
  };

  return <ReactEcharts style={{ height: height }} option={{ ...option}} />;
};

export default LineChart;
