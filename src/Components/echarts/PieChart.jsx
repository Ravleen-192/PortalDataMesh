
import * as React from "react";
import { render } from "react-dom";
import ReactEcharts from "echarts-for-react";

//Import json file. Used in {options}.
//const data = require("./data");
const data = [
    {
      "value": 600.58,
      "name": "Infrastructure Security",
      "itemStyle": {
        "normal": {
          "color": "#f845f1"
        }
      }
    },
    {
      "value": 1100.58,
      "name": "Threat and Vulnerability Management",
      "itemStyle": {
        "normal": {
          "color": "#ad46f3"
        }
      }
    },
    {
      "value": 1200.58,
      "name": "Incident Response Arrangement",
      "itemStyle": {
        "normal": {
          "color": "#5045f6"
        }
      }
    },
      
    {
      "value": 1500.58,
      "name": "Data Segregation and Protection",
      "itemStyle": {
        "normal": {
          "color": "#45dbf7"
        }
      }
    },
    
    {
      "value": 1600.58,
      "name": "Data Leakage Prevention",
      "itemStyle": {
        "normal": {
          "color": "#f69846"
        }
      }
    },
    {
      "value": 1800,
      "name": "Reactive Security",
      "itemStyle": {
        "normal": {
          "color": "#ff4343"
        }
      }
    }
  ];
const PieChart = ({ height, color = [] }) => {

const dataNames = data.map(i => i.name);

//Chart style
const style = {
  height: "90vh",
  width: "100%"
};

//Chart options
let option = {
  backgroundColor: 'white',
  toolbox: {
    show: true,
    feature: {
      mark: {
        show: true
      },
      magicType: {
        show: true,
        type: ["pie", "funnel"]
      },
      restore: {
        show: true,
        title: "Restore"
      },
      saveAsImage: {
        show: true,
        title: "Save Image"
      }
    }
  },
  
  // Hover Tooltip
  // {a} = series:[{name:}]
  // {b} = series:[{data: [{name:}]}]
  // {c} = series:[{data: [{value:}]
  tooltip: {
    trigger: "item",
    formatter: "{a}<br/><strong>{b}</strong>: {c} Suffix"
  },
  title: {
    text: "Security Compliance",
    left: "center",
    top: 20,
    textStyle: {
      color: "blue"
    }
  },
  calculable: true,
  legend: {
    icon: "circle",
    x: "center",
    y: "50px",
    data: dataNames,
    textStyle: {
      color: "#000"
    }
  },
  series: [
    {
      name: "Series Name",
      type: "pie",
      animationDuration: 2000,
      animationEasing: "quarticInOut",
      radius: [10, 150],
      avoidLabelOverlap: false,
      startAngle: 90,
      hoverOffset: 5,
      center: ["50%", "50%"],
      roseType: "area",
      selectedMode: "multiple",
      label: {
        normal: {
          show: true,
          formatter: "{b}" // {c} data: [{value:},]
        },
        emphasis: {
          show: true
        }
      },
      labelLine: {
        normal: {
          show: true,
          smooth: false,
          length: 20,
          length2: 10
        },
        emphasis: {
          show: true
        }
      },
      data: data
    }
  ]
};
return <ReactEcharts option={option} style={style} className="pie-chart" />;

};
export default PieChart;