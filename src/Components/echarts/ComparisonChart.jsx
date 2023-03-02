import { useTheme } from '@mui/system';
import ReactEcharts from 'echarts-for-react';

const ComparisonChart = ({ height, color = [] }) => {
  const theme = useTheme();

  const option = {
    grid: { top: '10%', bottom: '10%', right: '5%' },
    legend: { show: true },
    color: ['#223388', 'rgba(34, 51, 136, 0.8)'],
    barGap: 0,
    barMaxWidth: '64px',
    dataset: {
      source: [
        ['Domain', 'Primary PII', 'Secondary PII'],
        ['Cust 360', 2200, 1200],
        ['Serv Assure', 800, 500],
        ['Serv Deliv', 700, 1350],
        ['Onmi Ch', 1500, 1250],
        ['Bill & Pay', 2450, 450],
        ['Extern', 1700, 1250],
      ],
    },
    xAxis: {
      type: 'category',
      axisLine: { show: false },
      splitLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 13,
        fontFamily: 'roboto',
        color: 'blue',
      },
    },
    yAxis: {
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        lineStyle: { color: 'blue', opacity: 0.15 },
      },
      axisLabel: {
        fontSize: 13,
        fontFamily: 'roboto',
        color: 'black',
      },
    },
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [{ type: 'bar' }, { type: 'bar' }],
  };

  return <ReactEcharts style={{ height: height }} option={{ ...option }} />;
};

export default ComparisonChart;
