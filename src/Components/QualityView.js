import '../App.css';
import QualityImg from "../resources/dataquality.svg"
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {
      Chart, 
      ArcElement, 
      Legend,
      Tooltip as ChartTooltip,
      CategoryScale, 
      LinearScale,
      BarElement,} from 'chart.js'
import { Doughnut, Bar } from "react-chartjs-2";


import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from "react";
import ChartImg from "../resources/chart-svgrepo-com.svg"
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import QualityBrewImg from "../resources/quality_brew.png"
import UpdatedImg from "../resources/updated.png"

Chart.register(ArcElement, ChartTooltip,Legend, CategoryScale,LinearScale,BarElement,);

export const DonutChart = (props) =>{
  const chartData = props['data']
  const options = {
    elements: {
      arc: {
        borderWidth: 2
      },
      point: {
        hitRadius: 5
      }
    },
    plugins:{
      tooltip:{
        enabled: true,
        position: 'average',
        xAlign: 'center',
        yAlign: 'center',
        displayColors: false,
        filter: function (tooltipItem, data) {
           return tooltipItem.label !== ""; //if the label is empty do not show tooltip
        },
        callbacks:{
          title: function (tooltipItem) {
            return tooltipItem.label; //if the label is empty do not show tooltip
          },
          label: function (tooltipItem) {
            console.log(tooltipItem)
            return tooltipItem.label+" "+tooltipItem.formattedValue+'%'; //add % to the tooltip value
          },
        },
      },
      legend: {
        display: false,
        position: "top"
      }
    },
    text:chartData['centerText']
  };

  const plugins = [
    {
      beforeDraw: function(chart) {
      var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
          ctx.restore();
          var fontSize = (height / 100).toFixed(2);
          ctx.font = fontSize + "em sans-serif";
          ctx.textBaseline = "middle";
          const text = options.text,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;
          ctx.fillText(text, textX, textY);
          ctx.save();
      } 
    }
  ]
  const data = {
    maintainAspectRatio: true,
    responsive: true,
    labels: [chartData['title']],
    datasets: [
      {
        data: [props['data']['score'], props['data']['remaining']],
        backgroundColor: chartData['color'],
        hoverBackgroundColor: chartData['color']
      }
    ]
  };
    
  return (
      <>
        <div className='qualitybox'>
            <div className='title'>
              <Typography  component={'span'} variant="body2" color="text.secondary">
                <Box sx={{fontSize:'12px',fontWeight: 'bold'}}>{chartData['title']}</Box>
              </Typography>       
            </div>
          <Doughnut data={data} options={options} plugins={plugins}/>
        </div>
      </>
  )
}
const scoresAndText = {
  'overall'           :{  title:'Overall score',score:91, remaining:9,  centerText:'91%',color:["#558C12","#DA2F3A"]},
  'completeness'      :{  title:'Completeness', score:95, remaining:5,  centerText:'95%',color:["#558C12","#DA2F3A"]},
  'timeliness'        :{  title:'Timeliness',   score:90, remaining:10,  centerText:'90%',color:["#558C12","#DA2F3A"]},
  'validity'          :{  title:'Validty',      score:83, remaining:17,  centerText:'83%',color:["#558C12","#DA2F3A"]},
  'accuracy'          :{  title:'Accuracy',     score:91, remaining:9,  centerText:'91%',color:["#558C12","#DA2F3A"]},
  'consistency'       :{  title:'Consistency',  score:96, remaining:4,  centerText:'96%',color:["#558C12","#DA2F3A"]}
}

const UpdateChart = (props) =>{
  const chartData = props['data']
  const options = {
    elements: {
      arc: {
        borderWidth: 2
      },
      point: {
        hitRadius: 5
      }
    },
    plugins:{
      tooltip:{
        enabled: true,
        displayColors: false,
        position: 'nearest',
        xAlign: 'center',
        yAlign: 'bottom',
        intersect: false, //required to show tooltip if the value is zero
      },
      legend: {
        display: false,
        position: "top"
      }
    },
    text:chartData['centerText'],
    scales: {
      x: {
          grid: {
              display:false
          }
      },
      y: {
          grid: {
              display:false
          }   
      }
  }
  };

  
  const labels = ['Jan-2022', 'Feb-2022', 'Mar-2022', 'Apr-2022', 'May-2022', 'Jun-2022',
              'Jul-2022', 'Aug-2022', 'Sep-2022'];
  const data = {
    maintainAspectRatio: true,
    responsive: true,
    labels,
    datasets: [
      {
        data: [2,3,4,2,2,0,7,8,9],
        backgroundColor: '#37ABC8'
      }
    ]
  };
    
  return (
      <>
        <div className='timingbox'>
            <div className='title'>
              <Typography component={'span'} variant="body2" color="text.secondary">
                <Box sx={{fontWeight: 'bold'}}>Update frequency</Box>
              </Typography>       
            </div>
            <div className='chart'>
              <Bar data={data} options={options}/>
            </div>
        </div>
      </>
  )
}

//console.log(scoresAndText)
const QualityView = (props) =>{
  const [viewQualityImage, setViewQualityImage] = useState(false);

  const showQualityImage = () => {
    setViewQualityImage(true)
  };
  const hideQualityImage = () => {
    setViewQualityImage(false)
  };

    return (
      <>
        <div className='qualityattributes'>
          <div className="card" >
            <div className='text'>
              <img className='icon' src={QualityImg} color='red'/>          
              <Typography component={'span'} variant="body2" color="text.secondary">
                  <Box sx={{fontWeight: 'bold',marginLeft:'4px' }}>Quality metrics</Box>
              </Typography>       
              <ToggleButtonGroup 
                className='qattr'
                  size="small"
                  exclusive
                  onChange={showQualityImage}
                  aria-label="text alignment"
                  sx={{margin:'2px'}}
              >
                  <ToggleButton value="qualityattributes" aria-label="qualityattributes">
                      <Tooltip title="View detailed quality attributes" placement="bottom-start">
                          <img className="qvicon" src={ChartImg}/>         
                      </Tooltip>
                  </ToggleButton>                   
              </ToggleButtonGroup>
              {viewQualityImage && (
                <Dialog
                    className='brewimage'
                    sx={{
                      "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                          width: "100%",
                          maxWidth: "100%",  // Set your width here
                        },
                      },
                    }}
                    open
                    onClick={hideQualityImage}
                    onClose={hideQualityImage}
                  >
                    <img
                      className="brewimage"
                      src={QualityBrewImg}
                      onClick={hideQualityImage}
                      alt="no image"
                    />
                </Dialog>
              )}
            </div>     
            
              <Grid className='qualityboxes' container  alignItems="center" direction="row">
                <Grid item lg={2} md={4} sm={6}xs={12}>
                  <DonutChart data={scoresAndText['overall']}/>      
                </Grid>
                <Grid item lg={2} md={4} sm={6}xs={12}>
                  <DonutChart data={scoresAndText['completeness']}/>    
                </Grid>
                <Grid item lg={2} md={4} sm={6}xs={12}>
                  <DonutChart data={scoresAndText['timeliness']}/>    
                </Grid>
                <Grid item lg={2} md={4} sm={6}xs={12}>
                  <DonutChart data={scoresAndText['validity']}/>    
                </Grid>
                <Grid item lg={2} md={4} sm={6}xs={12}>
                  <DonutChart data={scoresAndText['accuracy']}/>    
                </Grid>
                <Grid item lg={2} md={4} sm={6}xs={12}>
                  <DonutChart data={scoresAndText['consistency']}/>    
                </Grid>
              </Grid>
            
          </div>  
        </div>  
        <div className='qualityattributes'>
          <div className="card" >
            <div className='text'>
              <img className='icon' src={UpdatedImg} color='red'/>          
              <Typography component={'span'} variant="body2" color="text.secondary">
                  <Box sx={{fontWeight: 'bold',marginLeft:'4px' }}>Update frequency</Box>
              </Typography>
            </div>     
            <div className='timingboxes'>
              <UpdateChart  data={scoresAndText['overall']}></UpdateChart>
            </div>
          </div>  
        </div>  
      </>
    )
}

export default QualityView;