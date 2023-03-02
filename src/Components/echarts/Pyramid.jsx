import ReactEcharts from 'echarts-for-react';

const option = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
    valueFormatter: (value) => Math.abs(value),
  },
  legend: {
    itemWidth: 30,
    itemHeight: 30,

    data: [
      {
        name: "Encription at rest",
        icon: "circle",
      },
      {
        name: "Encription in transit",
        icon: "circle",
      },
    ],
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "value",
      show: true,
      axisLabel: {
        formatter: function (params) {
          return Math.abs(params);
        },
      },
    },
  ],
  yAxis: [
    {
      type: "category",
      axisTick: {
        show: false,
      },
      nameTextStyle: {
        fontStyle: "oblique",
        fontWeight: "bold",
      },
      data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
  ],
  series: [
    {
      name: "Encription at rest",
      type: "bar",
      color: "#87def4",
      stack: "Total",
      label: {
        show: false,
        position: "right",
      },
      emphasis: {
        focus: "none",
      },
      data: [320, 302, 341, 374, 390, 450, 420],
    },
    {
      name: "Encription in transit",
      type: "bar",
      color: "rgb(226, 222, 222)",
      stack: "Total",
      label: {
        show: false,
        position: "left",
        formatter: function (params) {
          return Math.abs(params.value);
        },
      },
      emphasis: {
        focus: "none",
      },
      data: [-120, -132, -101, -134, -190, -230, -210],
    },
  ],
};

const Pyramid =  ({ height, color }) => {
    
  return <ReactEcharts style={{ height: height }} option={{ ...option}} />;
};

export default Pyramid;
