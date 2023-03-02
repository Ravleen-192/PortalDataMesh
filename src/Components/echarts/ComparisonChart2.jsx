import { useTheme } from '@mui/system';
import ReactEcharts from 'echarts-for-react';

const ComparisonChart2 = ({ height }) => {
  const { palette } = useTheme();

  const option = {
    grid: { left: '6%', bottom: '10%', right: '1%' },
    legend: {
      itemGap: 20,
      icon: 'circle',
      textStyle: { color: 'blue', fontSize: 13, fontFamily: 'roboto' },
    },
    barMaxWidth: '10px',
    dataset: {
      source: [
        ['Domain', 'Authorized', 'Admin', 'User', 'Consumer'],
        ['Cust-360', 2200, 1200, 950, 800],
        ['Serv Assur', 800, 500, 1500, 600],
        ['Serv Deliv', 700, 1350, 800, 700],
        ['Omni Ch', 1500, 1250, 950, 900],
        ['Bill & Pay', 2450, 450, 950, 500],
        ['Extern', 1700, 1250, 1500, 800],
      ],
    },
    xAxis: {
      type: 'category',
      axisLine: { show: false },
      splitLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: 'black', fontSize: 13, fontFamily: 'roboto' },
    },
    yAxis: {
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        lineStyle: { color: 'blue', opacity: 0.15 },
      },
      axisLabel: { color: 'black', fontSize: 13, fontFamily: 'roboto' },
    },
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [
      { type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] } },
      { type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] } },
      { type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] } },
      { type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] } },
    ],
  };

  return <ReactEcharts style={{ height: height }} option={option} />;
};

export default ComparisonChart2;
