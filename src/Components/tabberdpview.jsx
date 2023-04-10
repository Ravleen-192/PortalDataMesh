import { Box } from "@mui/material";

import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import  SimpleCard  from './SimpleCard'
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import DetailsTwoToneIcon from '@mui/icons-material/DetailsTwoTone';
import RouteTwoToneIcon from '@mui/icons-material/RouteTwoTone';
import { DataAttrList } from "../Data/DataAttrList";
import TemplateItem from "./TemplateItem";
import "../Template.css";

import AppsTwoToneIcon from '@mui/icons-material/AppsTwoTone';
import IntegrationInstructionsTwoToneIcon from '@mui/icons-material/IntegrationInstructionsTwoTone';

import PropTypes from "prop-types";

import LineChartdpview from './echarts/LineChartdpview';
import {styled } from '@mui/material';


//////////////
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import DPTableView from './DPTableView';
import QualityView from './QualityView';
import Grid from '@mui/material/Grid';
import PIIImg from "../resources/datapii.svg"
import RecencyImg from "../resources/recency.svg"
import SubscriberCountImg from "../resources/subscribercount.svg"
import RatingImg from "../resources/rating.svg"
import ArchetypeImg from "../resources/archetype.png"
import SubtypeImg from "../resources/archetype-subtype.png"
import AppsImg from "../resources/apps.svg"
import CodeImg from "../resources/code.svg"
import InfrastructureImg from '../resources/infra.svg';

import LineageImg from "../resources/lineage.png"
import { useState } from "react";
import { useRef } from "react";
import Xarrow from "react-xarrows";

const canvasStyle = {
  position: 'relative',
  background: 'white',
  height:'300px',
  display: 'flex',
  flexDirection:'column',
  justifyContent: 'space-evenly',
  alignItems: 'center',
};
const boxStyle = {
  display:'flex',
  position: 'relative',
  border: '2px #aaa solid',
  borderRadius: '4px',
  textAlign: 'center',
  height: '30px',
  color: 'black',
  margin:'3px',
  padding:'3px',
  alignItems:'center',
  width:'auto',
  minWidth:'130px',
  justifyContent:'center'
};
const LineageBox = (props) => {
  return (
    <div ref={props.box.ref} id={props.box.id} style={boxStyle}>
      {props.box.id}
    </div>
  );
};

const DPLineageView = (props) => {  
  const box0 = { id: props['catalogName'], ref: useRef(null) };
  const box1 = { id: props['tableName'], ref: useRef(null) };
  const box2 = { id: props['columnName'], ref: useRef(null) };

  return (
    <React.Fragment>
      <div >
        <div className="dppreviewtitle">
          <div className="text">
              <Typography component={'span'} variant="body2" color="text.secondary">
                  <Box sx={{fontWeight: 'bold', marginTop:'4px',marginBottom:'4px' }}>Lineage</Box>    
              </Typography>    
          </div>
        </div>
        <div style={canvasStyle} id="canvas">
          <LineageBox box={box0} />
          <LineageBox box={box1} />
          <LineageBox box={box2} />
          <Xarrow start={box0.id} end={box1.ref} headSize={3} color={'#0D9F98'}/>                
          <Xarrow start={box1.ref} end={box2.ref} headSize={3} color={'#0D9F98'}/>                
        </div>
      </div>
    </React.Fragment>
  );
}

const Container = styled("div")(({ theme }) => ({
  margin:"20px",
   marginBottom: "30px",
   }
 ));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 6 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);
  const dpData = props.dpData    
  const [activeColumn, setActiveColumn] = useState(dpData["Tables"][0]["Columns"][0]['Name']);
  const  clickColumnHandler=(key) => {
    setActiveColumn(key)
  }

  const PropItem = (props) =>{
    return(
      <Grid className='propsitem' container spacing={0}>
        <Grid className="propsitemtitle" item lg={5} md={12} sm={12}xs={12} key={props.id}>
          <img className="img" src={props.icon}/> 
          <p className='propsitemtitletext'>{props.title}</p>
        </Grid>
        <Grid className="text" item lg={7} md={12} sm={12 }xs={12} key={props.id}>
          {props.value}
        </Grid>
      </Grid>
    );
  }  
  const PropItemRating = (props) =>{
    return(
      <Grid className='propsitem' container spacing={0}>
        <Grid className="propsitemtitle" item lg={5} md={12} sm={12}xs={12} key={props.id}>
          <img className="img" src={props.icon}/> 
          <p className='propsitemtitletext'>{props.title}</p>
        </Grid>
        <Grid className="rating" item lg={7} md={12} sm={12 }xs={12} key={props.id}>
          <Rating
                  size='small'
                  name="simple-controlled"
                  value={props.rating}              
                  readOnly
          />
        </Grid>
      </Grid>
    );
  }
  function renderTableView(dpData){
    if(dpData["Tables"].length === 0){
      return(
        <></>
      )
    } else {
      return(
        <DPTableView dpData={dpData}>
        </DPTableView>
      )
    }
  }  
  
  const [viewQualityImage, setViewQualityImage] = useState(false);

  const showQualityImage = () => {
    setViewQualityImage(true)
  };
  const hideQualityImage = () => {
    setViewQualityImage(false)
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon label tabs example"
        >
          <Tab
            sx={{ width: "200px", color: '#0D9F98' }}
            icon={<InfoTwoToneIcon />}
            label="General"
          />
          <Tab
            sx={{ width: "200px", color: '#0D9F98' }}
            icon={<DetailsTwoToneIcon />}
            label="Explore"
          />
         

          <Tab
            sx={{ width: "200px", color: '#0D9F98' }}
            icon={<RouteTwoToneIcon />}
            label="Data Quality & Lineage"
          />
           <Tab
            sx={{ width: "200px", color: '#0D9F98' }}
            icon={<IntegrationInstructionsTwoToneIcon />}
            label="Platform Dependencies"
          />
          <Tab
            sx={{ width: "200px", color: '#0D9F98' }}
            icon={<AppsTwoToneIcon />}
            label="Usage"
          />
         
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <Container>
      
      <Box sx={{ py: '12px' }} />

      <SimpleCard title="General">
          <div className='propsitems'>
            <PropItem title="PII" icon={PIIImg} value={dpData["Contains PII"]?"Yes":"No"}/>
            <PropItem title="Updated on" icon={RecencyImg} value={dpData["Last Update Date"]}/>
            <PropItem title="#Subscribers " icon={SubscriberCountImg}  value="-"/>
          </div>
          <div className='propsitems'>
            <PropItem title="Archetype" icon={ArchetypeImg} value={dpData["Archetype"]}/>
            <PropItem title="Subtype" icon={SubtypeImg} value={dpData["Subtype"].length === 0 ? "None" :dpData["Subtype"]}/>
            <PropItemRating title="Rating&nbsp; " icon={RatingImg}  rating={0}/>
          </div>
          <div className='codeinfra'>
          <div className="card">
            <div className='code'>
              <div className='title'>
                <img className='icon' src={CodeImg} color='red'/>          
                <Typography component={'span'} variant="body2" color="text.secondary">
                  <Box sx={{fontWeight: 'bold',marginLeft:'5px' }}>Code</Box>
                </Typography>
              </div>
              <div className='links'>
                <Typography component={'span'} variant="body2" color="text.secondary">
                  <div className='link'>
                    <Box sx={{fontSize:14,fontWeight: 'bold' }}>Ref Code :</Box>
                    <Link target="_blank" sx={{fontSize:14,marginLeft:'5px'}}
                                href={dpData["LinkRefCode"]} rel="noreferrer">
                                {dpData["LinkRefCode"]}
                    </Link>
                  </div>
                  <div className='link'>
                  <Box sx={{fontSize:14,fontWeight: 'bold' }}>Readme &nbsp;&nbsp;:</Box>
                    <Link target="_blank" sx={{fontSize:14,marginLeft:'5px'}}
                                href={dpData["LinkReadme"]} rel="noreferrer">
                                {dpData["LinkReadme"]}
                    </Link>
                  </div>
                </Typography>       
              </div>     
            </div>
              <div className='code'>
                <div className='title'>
                  <img className='icon' src={InfrastructureImg} color='red'/>          
                  <Typography component={'span'} variant="body2" color="text.secondary">
                    <Box sx={{fontWeight: 'bold',marginLeft:'5px' }}>Infrastructure</Box>
                  </Typography>
                </div>
                <div className='links'>
                  <Typography component={'span'} variant="body2" color="text.secondary">
                    <div className='link'>
                      <Box sx={{fontSize:14,fontWeight: 'bold' }}>Source Types :</Box>
                      <Box sx={{fontSize:14,fontWeight: 'normal',marginLeft:'3px' }}>{dpData["Source Type"]}</Box>
                    </div>
                    <div className='link'>
                      <Box sx={{fontSize:14,fontWeight: 'bold' }}>Storage &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Box>
                      <Box sx={{fontSize:14,fontWeight: 'normal',marginLeft:'3px' }}>{dpData["Storage"]}</Box>
                    </div>
                  </Typography>       
                </div>     
              </div>
          </div>  
        </div>
      </SimpleCard>

      
    </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Container>
      
      <Box sx={{ py: '12px' }} />

      <SimpleCard title="Explore">
      {renderTableView(dpData)}
      </SimpleCard>

      
    </Container>
      </TabPanel>
    
      <TabPanel value={value} index={2}>
      <Container>
      
      <Box sx={{ py: '12px' }} />

      <SimpleCard title="Quality and Lineage"> {/* Need to get the data here. Hard Coded*/ }
      <DPLineageView 
                catalogName = {dpData['Product Name']}
                tableName = {dpData["Tables"][0]['Name']}
                columnName={activeColumn}/>
      <QualityView>
        </QualityView>
      </SimpleCard>

      
    </Container>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <Container>
      
      <Box sx={{ py: '12px' }} />

      <SimpleCard title="Platform dependencies">
        <LineChartdpview
          height="500px"
          
        />
      </SimpleCard>

      
    </Container>
      </TabPanel>
      <TabPanel value={value} index={4}>
      <Container>
      
      <Box sx={{ py: '12px' }} />

      <SimpleCard title="">
      <div className='usecase'>
       {/*<div className="card">
            <img className='icon' src={AppsImg} color='red'/>          
            <Typography component={'span'}  variant="body2" color="text.secondary">
              <Box sx={{fontWeight: 'bold',marginLeft:'4px' }}>Usage and Apps</Box>
            </Typography>            
          </div>  */}
           <div className="template">
       <div className="form">        
        <div className="fields">
        
      <h1 className="templateTitle">{"Usage and Apps"}</h1>
      
      
      <div className="templateList">  
        {DataAttrList.map((templateItem, key) => {
          console.log("templateItem",)
          return (
            <TemplateItem
              key={key}
              image={templateItem.image}
              name={templateItem.name}
              price={templateItem.price}
            />
          );
        })}
      </div>
    
      </div>
      </div>
      </div>
  </div>
      </SimpleCard>

      
    </Container>
          
     
     
      </TabPanel>
    </>
  );
}
