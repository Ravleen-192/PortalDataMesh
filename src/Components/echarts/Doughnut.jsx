import { useTheme } from '@mui/system';
import ReactEcharts from 'echarts-for-react';

const DoughnutChart = ({ height, color = [] }) => {
  const theme = useTheme();

  const option = {
    legend: {
      show: true,
      itemGap: 20,
      icon: 'circle',
      x: "center",
      y: "20px",
      bottom: 0,
      textStyle: { color: 'black', fontSize: 13, fontFamily: 'roboto' },
    },
    tooltip: { show: false, trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
    xAxis: [{ axisLine: { show: false }, splitLine: { show: false } }],
    yAxis: [{ axisLine: { show: false }, splitLine: { show: false } }],

    series: [
      {
        name: 'Overall Compliance Metrix',
        type: 'pie',
        radius: ['45%', '72.55%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        hoverOffset: 5,
        stillShowZeroSum: false,
        label: {
          normal: {
            show: false,
            position: 'center', // shows the description data to center, turn off to show in right side
            textStyle: {
              color: 'black',
              fontSize: 13,
              fontFamily: 'roboto',
            },
            formatter: '{a}',
          },
          emphasis: {
            show: true,
            textStyle: { fontSize: '14', fontWeight: 'normal' },
            formatter: '{b} \n{c} ({d}%)',
          },
        },
        labelLine: { normal: { show: false } },
        data: [
          { value: 65, name: 'Authorization' },
          { value: 20, name: 'Security' },
          { value: 15, name: 'PII' },
        ],
        itemStyle: {
          emphasis: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' },
        },
      },
    ],
  };

  return <ReactEcharts style={{ height: height }} option={{ ...option}} />;
};

export default DoughnutChart;
