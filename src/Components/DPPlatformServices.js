import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import {ReactComponent as ProducerIcon} from '../resources/producer.svg'
import {ReactComponent as ConsumerIcon} from '../resources/consumer.svg'
import {ReactComponent as PIIIcon } from '../resources/pii.svg'
import {ReactComponent as QualityIcon } from '../resources/quality.svg'

import { useEffect, useState, useContext,createContext,useRef, useReducer } from "react";
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import Divider from '@mui/material/Divider';
import { get_producer_template, get_producer_templates } from '../Data/templates_producer';
import { get_consumer_template, get_consumer_templates } from '../Data/templates_consumer';
import { get_compliance_template, get_compliance_templates } from '../Data/templates_compliance';
import { get_qcheck_template, get_qcheck_templates } from '../Data/templates_quality';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close'
import { ConsoleLogger } from '@aws-amplify/core';
import { Analytics } from 'aws-amplify';

const templateTypes = [
  ['None',''],
  ['Producer','Producer'],
  ['Consumer','Consumer'],
  ['Compliance','Compliance'],
  ['Quality Check','Quality Check'],
]
const sourceList = [
  ['None',''],
  ['AWS S3','AWS S3'],
  ['AWS Redshift','AWS Redshift'],
  ['AWS RDS','AWS RDS'],
  ['Oracle','Oracle'],
  ['SQL Server','SQL Server'],
  ['MongoDB','MongoDB'],
  ['Google Storage','Google Storage'],
  ['AZURE Blob','AZURE Blob'],
  ['MQTT/IOT','MQTT/IOT'],
  ['Streaming events','Streaming events'],
  ['AWS DynamoDB','AWS DynamoDB'],
  ['Terradata','Terradata'],
  ['Db2','Db2'],
  ['SalesForce','SalesForce'],
  ['ServiceNow','ServiceNow'],
  ['Adobe Analytics','Adobe Analytics'],
  ['Workday','Workday']
]
const targetList = [
  ['None',''],
  ['AWS S3','AWS S3'],
  ['Google Storage','Google Storage'],
  ['AZURE Blob','AZURE Blob'],
  ['AWS Redshift','AWS Redshift'],
  ['AWS Kinesis','AWS Kinesis'],
  ['AWS Aurora','AWS Aurora'],
  ['AWS Elasticsearch','AWS Elasticsearch'],
  ['OpenSearch','OpenSearch']
]
const targetFormat = [
  ['None',''],
  ['CSV','CSV'],
  ['JSON','JSON'],
  ['Parquet','Parquet']
]
const consumingToolList = [
  ['None',''],
  ['Spark','Spark'],
  ['PowerBI','PowerBI'],
  ['Tableau','Tableau'],
  ['ThoughtSpot','ThoughtSpot']
]
const complianceStd = [
  ['None',''],
  ['HIPAA','HIPAA'],
  ['GDPR','GDPR'],
  ['CCPA','CCPA'],
  ['PCI DSS','PCI DSS']
]
const maskingMethod = [    
  ['None',''],
  ['Encryption','Encryption'],
  ['Substitution','Substitution'],
  ['Shuffling','Shuffling'],
  ['Scrambling','Scrambling'],
  ['Nulling','Nulling']
]  
const checkTypeList = [
  ['None',''],
  ['Completeness','Completeness'],
  ['Timeliness','Timeliness'],
  ['Validity','Validity'],
  ['Accuracy','Accuracy'],
  ['Consistency','Consistency']
]
const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'absolute',
  '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));
const actions = [
  { icon: <ProducerIcon />, name: 'Add Producer Template',operation:'addprodtemplate' },
  { icon: <ConsumerIcon />, name: 'Add Consumer Template',operation:'addconstemplate' },
  { icon: <PIIIcon />, name: 'Add Compliance Check Template',operation:'addcompliancechecktemplate' },
  { icon: <QualityIcon />, name: 'Add Quality Check Template',operation:'addqualtemplate'},
];
export function BasicSpeedDial(props) {
  const setTemplateType = props.setTemplateType
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  function handleClose (operation) {
    setOpen(false);
    switch (operation){
      case 'addprodtemplate':
        setTemplateType('Producer')
        return
      case 'addconstemplate':
        setTemplateType('Consumer')
        return
      case 'addcompliancechecktemplate':
        setTemplateType('PII')
        return
      case 'addqualtemplate':                
        setTemplateType('Quality')
        return
    }
  }

return (
  <StyledSpeedDial className='templatespeeddial'
    ariaLabel="SpeedDial basic example"
    sx={{ position: 'relative', bottom: 0, right: 0,'& .MuiFab-primary': { width: 40, height: 40 }}}
    icon={<SpeedDialIcon />}
    direction={'right'}
    onClose={handleClose}
    onOpen={handleOpen}
    open={open}
  >
    {actions.map((action) => (
    <SpeedDialAction
      key={action.name}
      icon={action.icon}
      tooltipTitle={action.name}
      onClick={() => 
          handleClose(action.operation)
      }
    />
    ))}
  </StyledSpeedDial>
    
);
}
const CssTextField = styled(TextField)({
  '& label': {
    color: '#5C504D',
  },
  '& label.Mui-focused': {
    color: '#5C504D',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#5C504D',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'darkgray',
    },
    '&:hover fieldset': {
      borderColor: '#5C504D',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#5C504D',
    },
  },
});
const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));
export function DPProducer(props){
  
  const [publishData,setPublishData] = useState(props.publishData)
    return (
      <div className="form">        
        <div className="fields">
          <h4 className="title"> Producer Template</h4>
          <CssTextField   value={publishData['Template Name']} className='field' size='small' label="Name"  
                                                onChange={(e) => setPublishData(publishData =>({
                                                      ...publishData,
                                                      ['Template Name']:e.target.value}))}/>
          <CssTextField  value={publishData['Template Description']} className='field' multiline size='small' label="Description"  
                                                onChange={(e) => setPublishData(publishData =>({
                                                      ...publishData,
                                                      ['Template Description']:e.target.value}))}/>                  
          <div className="storage">
            <FormControl sx={{ width: '500px' }} size='small'>
              <InputLabel id="demo-simple-select-label">DP Source</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={publishData['DP Source']}
                label="DP Source"
                onChange={(e) => setPublishData(publishData =>({
                  ...publishData,
                  ['DP Source']:e.target.value}))}
              >
              {
                sourceList.map((source) => (
                  <MenuItem key={source[0]} value={source[1]} >{source[0]}</MenuItem>
                ))
              }
              </Select>
            </FormControl>
          </div>
          <div className="storage">
            <FormControl sx={{ width: '500px' }} size='small'>
              <InputLabel id="demo-simple-select-label">DP Target</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={publishData['DP Target']}
                label="DP Target"
                onChange={(e) => setPublishData(publishData =>({
                  ...publishData,
                  ['DP Target']:e.target.value}))}
              >
              {
                targetList.map((target) => (
                  <MenuItem key={target[0]} value={target[1]} >{target[0]}</MenuItem>
                ))
              }
              </Select>
            </FormControl>
          </div>
          <div className="storage">
            <FormControl sx={{ width: '500px' }} size='small'>
              <InputLabel id="demo-simple-select-label">DP Format</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={publishData['DP Format']}
                label="DP Format"
                onChange={(e) => setPublishData(publishData =>({
                  ...publishData,
                  ['DP Format']:e.target.value}))}
              >
              {
                targetFormat.map((format) => (
                  <MenuItem key={format[0]} value={format[1]} >{format[0]}</MenuItem>
                ))
              }
              </Select>
            </FormControl>
          </div>
          <CssTextField  value={publishData['LinkRefCode']} className='field' size='small' label="Github Repo : Reference Code" onChange={(e) => setPublishData(publishData =>({
                                                      ...publishData,
                                                      ['LinkRefCode']:e.target.value}))}/>
          <CssTextField  value={publishData['LinkReadme']} className='field' size='small' label="Github Repo : Readme" onChange={(e) => setPublishData(publishData =>({
                                                      ...publishData,
                                                      ['LinkReadme']:e.target.value}))}/>                                                                                                                        
        </div>
      </div> 
    )
}
export function DPViewProducer(props){
  const publishData = get_producer_template(props.selectedTemplateId)
  return (
    <div className="form">        
      <div className="fields">
        <h4 className="title"> Producer Template</h4>
        <CssTextField   value={publishData['Template Name']} className='field' size='small' label="Name"  />
        <CssTextField  value={publishData['Template Description']} className='field' multiline size='small' label="Description"/>                  
        <div className="storage">
          <FormControl sx={{ width: '500px' }} size='small'>
            <InputLabel id="demo-simple-select-label">DP Source</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={publishData['DP Source']}
              label="DP Source"
            >
            {
              sourceList.map((source) => (
                <MenuItem key={source[0]} value={source[1]} >{source[0]}</MenuItem>
              ))
            }
            </Select>
          </FormControl>
        </div>
        <div className="storage">
          <FormControl sx={{ width: '500px' }} size='small'>
            <InputLabel id="demo-simple-select-label">DP Target</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={publishData['DP Target']}
              label="DP Target"
            >
            {
              targetList.map((target) => (
                <MenuItem key={target[0]} value={target[1]} >{target[0]}</MenuItem>
              ))
            }
            </Select>
          </FormControl>
        </div>
        <div className="storage">
          <FormControl sx={{ width: '500px' }} size='small'>
            <InputLabel id="demo-simple-select-label">DP Format</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={publishData['DP Format']}
              label="DP Format"
            >
            {
              targetFormat.map((format) => (
                <MenuItem key={format[0]} value={format[1]} >{format[0]}</MenuItem>
              ))
            }
            </Select>
          </FormControl>
        </div>
        <CssTextField  value={publishData['LinkRefCode']} className='field' size='small' label="Github Repo : Reference Code" />
        <CssTextField  value={publishData['LinkReadme']} className='field' size='small' label="Github Repo : Readme" />
      </div>
    </div> 
  )
}
export function AddProducer(props){
  const setTemplateType = props.setTemplateType
  function submitTemplate(){
    alert("Template is submitted")
    console.log(publishData)
    //publishData['Product Name'] = 'hello'
  }
  const [publishData, setPublishData] = useState({
                                        'id':'',
                                        'Template Name':'',
                                        'Template Description':'',
                                        'DP Source':'',
                                        'DP Target':'',
                                        'DP Format':'',
                                        'LinkRefCode':'',
                                        'LinkReadme':''
                                        })
      
  return (
    <div className="form">        
      <DPProducer publishData={publishData} setPublishData={setPublishData}/>
      <div className="button">
        <Button  sx={{width:'160px'}}variant="contained" 
              onClick={()=>{
                  setTemplateType('')
                  submitTemplate()} 
        }>
              Submit
        </Button>
      </div>
    </div> 
  )
}
export function DPConsumer(props){
  const [publishData,setPublishData] = useState(props.publishData)
  const sourceList = targetList
  const sourceFormat = targetFormat
  
  return (
    <div className="fields">
      <h4 className="title"> Consumer Template</h4>
      <CssTextField  value={publishData['Template Name']} className='field' size='small' label="Name"  
                                          onChange={(e) => setPublishData(publishData =>({
                                                  ...publishData,
                                                  ['Template Name']:e.target.value}))}/>
      <CssTextField  value={publishData['Template Description']} className='field' multiline size='small' label="Description"  
                                          onChange={(e) => setPublishData(publishData =>({
                                                  ...publishData,
                                                  ['Template Description']:e.target.value}))}/>                  
      <div className="storage">
        <FormControl sx={{ width: '500px' }} size='small'>
          <InputLabel id="demo-simple-select-label">DP Source</InputLabel>
          <Select
            labelId="demo-simple-select-label1"
            id="demo-simple-select1"
            value={publishData['DP Source']}
            label="DP Source"
            onChange={(e) => setPublishData(publishData =>({
              ...publishData,
              ['DP Source']:e.target.value}))}
          >
          {
            sourceList.map((source) => (
              <MenuItem key={source[0]} value={source[1]} >{source[0]}</MenuItem>
            ))
          }
          </Select>
        </FormControl>
      </div>
      <div className="storage">
        <FormControl sx={{ width: '500px' }} size='small'>
          <InputLabel id="demo-simple-select-label">DP Format</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={publishData['DP Format']}
            label="DP Format"
            onChange={(e) => setPublishData(publishData =>({
              ...publishData,
              ['DP Format']:e.target.value}))}
          >
          {
            sourceFormat.map((format) => (
              <MenuItem key={format[0]} value={format[1]} >{format[0]}</MenuItem>
            ))
          }
          </Select>
        </FormControl>
      </div>
      <div className="storage">
        <FormControl sx={{ width: '500px' }} size='small'>
          <InputLabel id="demo-simple-select-label">DP Consuming Tool</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={publishData['DP Consuming Tool']}
            label="DP Consuming Tool"
            onChange={(e) => setPublishData(publishData =>({
              ...publishData,
              ['DP Consuming Tool']:e.target.value}))}
          >
          {
            consumingToolList.map((tool) => (
              <MenuItem key={tool[0]} value={tool[1]} >{tool[0]}</MenuItem>
            ))
          }
          </Select>
        </FormControl>
      </div>
      <CssTextField  value={publishData['LinkRefCode']} className='field' size='small' label="Github Repo : Reference Code" onChange={(e) => setPublishData(publishData =>({
                                                  ...publishData,
                                                  ['LinkRefCode']:e.target.value}))}/>
      <CssTextField  value={publishData['LinkReadme']} className='field' size='small' label="Github Repo : Readme" onChange={(e) => setPublishData(publishData =>({
                                                  ...publishData,
                                                  ['LinkReadme']:e.target.value}))}/>                                                                                                                        
    </div>
  )  
}
export function DPViewConsumer(props){
  const publishData = get_consumer_template(props.selectedTemplateId)
  const sourceList = targetList
  const sourceFormat = targetFormat
  return (
    <div className="fields">
      <h4 className="title"> Consumer Template</h4>
      <CssTextField  value={publishData['Template Name']} className='field' size='small' label="Name" />
      <CssTextField  value={publishData['Template Description']} className='field' multiline size='small' label="Description" />                  
      <div className="storage">
        <FormControl sx={{ width: '500px' }} size='small'>
          <InputLabel id="demo-simple-select-label">DP Source</InputLabel>
          <Select
            labelId="demo-simple-select-label1"
            id="demo-simple-select1"
            value={publishData['DP Source']}
            label="DP Source"
          >
          {
            sourceList.map((source) => (
              <MenuItem key={source[0]} value={source[1]} >{source[0]}</MenuItem>
            ))
          }
          </Select>
        </FormControl>
      </div>
      <div className="storage">
        <FormControl sx={{ width: '500px' }} size='small'>
          <InputLabel id="demo-simple-select-label">DP Format</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={publishData['DP Format']}
            label="DP Format"
          >
          {
            sourceFormat.map((format) => (
              <MenuItem key={format[0]} value={format[1]} >{format[0]}</MenuItem>
            ))
          }
          </Select>
        </FormControl>
      </div>
      <div className="storage">
        <FormControl sx={{ width: '500px' }} size='small'>
          <InputLabel id="demo-simple-select-label">DP Consuming Tool</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={publishData['DP Consuming Tool']}
            label="DP Consuming Tool"
          >
          {
            consumingToolList.map((tool) => (
              <MenuItem key={tool[0]} value={tool[1]} >{tool[0]}</MenuItem>
            ))
          }
          </Select>
        </FormControl>
      </div>
      <CssTextField  value={publishData['LinkRefCode']} className='field' size='small' label="Github Repo : Reference Code" />
      <CssTextField  value={publishData['LinkReadme']} className='field' size='small' label="Github Repo : Readme"/>                                                                                                                        
    </div>
  )  
}
export function AddConsumer(props){
  const setTemplateType = props.setTemplateType
  function submitTemplate(){
    alert("Template is submitted")
    //console.log(publishData)
    //publishData['Product Name'] = 'hello'
  }
  const [publishData, setPublishData] = useState({
                                          'Template Name':'',
                                          'Template Description':'',
                                          'DP Source':'',
                                          'DP Format':'',
                                          'DP Consuming Tool':'',
                                          'LinkRefCode':'',
                                          'LinkReadme':''
                                          })
        
  return (
    <div className="form">        
      <DPConsumer publishData={publishData} setPublishData={setPublishData}/>
      <div className="button">
        <Button  sx={{width:'160px'}}variant="contained" 
              onClick={()=>{
                  setTemplateType('')
                  submitTemplate()} 
              }>
              Submit
        </Button>
      </div>
    </div> 
  )
}
export function DPCompliance(props){
  const [publishData,setPublishData] = useState(props.publishData)
  return (
    <div className="form">        
      <div className="fields">
        <h4 className="title"> Compliance Check Template</h4>
        <CssTextField  value={publishData['Template Name']} className='field' size='small' label="Name"  onChange={(e) => setPublishData(publishData =>({
                                                    ...publishData,
                                                    ['Template Name']:e.target.value}))}/>
        <CssTextField  value={publishData['Template Description']} className='field' multiline size='small' label="Description"  onChange={(e) => setPublishData(publishData =>({
                                                    ...publishData,
                                                    ['Template Description']:e.target.value}))}/>                  
        <div className="storage">
          <FormControl sx={{ width: '500px' }} size='small'>
            <InputLabel id="demo-simple-select-label">DP Source</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={publishData['DP Source']}
              label="DP Source"
              onChange={(e) => setPublishData(publishData =>({
                ...publishData,
                ['DP Source']:e.target.value}))}
            >
            {
              sourceList.map((source) => (
                <MenuItem key={source[0]} value={source[1]} >{source[0]}</MenuItem>
              ))
            }
            </Select>
          </FormControl>
        </div>
        <div className="storage">
          <FormControl sx={{ width: '500px' }} size='small'>
            <InputLabel id="demo-simple-select-label">DP Target</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={publishData['DP Target']}
              label="DP Target"
              onChange={(e) => setPublishData(publishData =>({
                ...publishData,
                ['DP Target']:e.target.value}))}
            >
            {
              targetList.map((target) => (
                <MenuItem key={target[0]} value={target[1]} >{target[0]}</MenuItem>
              ))
            }
            </Select>
          </FormControl>
        </div>
        <div className="storage">
          <FormControl sx={{ width: '500px' }} size='small'>
            <InputLabel id="demo-simple-select-label">DP Format</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={publishData['DP Format']}
              label="DP Format"
              onChange={(e) => setPublishData(publishData =>({
                ...publishData,
                ['DP Format']:e.target.value}))}
            >
            {
              targetFormat.map((format) => (
                <MenuItem key={format[0]} value={format[1]} >{format[0]}</MenuItem>
              ))
            }
            </Select>
          </FormControl>
        </div>
        <div className="storage">
          <FormControl sx={{ width: '500px' }} size='small'>
            <InputLabel id="demo-simple-select-label">Compliance</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={publishData['Compliance']}
              label="Compliance"
              onChange={(e) => setPublishData(publishData =>({
                ...publishData,
                ['Compliance']:e.target.value}))}
            >
            {
              complianceStd.map((compliance) => (
                <MenuItem key={compliance[0]} value={compliance[1]} >{compliance[0]}</MenuItem>
              ))
            }
            </Select>
          </FormControl>
        </div>              
        <div className="storage">
          <FormControl sx={{ width: '500px' }} size='small'>
            <InputLabel id="demo-simple-select-label">Masking Method</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={publishData['Masking Method']}
              label="Masking Method"
              onChange={(e) => setPublishData(publishData =>({
                ...publishData,
                ['Masking Method']:e.target.value}))}
            >
            {
              maskingMethod.map((masking) => (
                <MenuItem key={masking[0]} value={masking[1]} >{masking[0]}</MenuItem>
              ))
            }
            </Select>
          </FormControl>
        </div>                            
        <CssTextField  value={publishData['LinkRefCode']} className='field' size='small' label="Github Repo : Reference Code" onChange={(e) => setPublishData(publishData =>({
                                                    ...publishData,
                                                    ['LinkRefCode']:e.target.value}))}/>
        <CssTextField  value={publishData['LinkReadme']} className='field' size='small' label="Github Repo : Readme" onChange={(e) => setPublishData(publishData =>({
                                                    ...publishData,
                                                    ['LinkReadme']:e.target.value}))}/>                                                                                                                        
      </div>
    </div> 
  )  
}
export function DPViewCompliance(props){
  const publishData = get_compliance_template(props.selectedTemplateId)
  const sourceList = [
    ['None',''],
    ['AWS S3','AWS S3'],
    ['AWS Redshift','AWS Redshift'],
    ['AWS RDS','AWS RDS'],
    ['Oracle','Oracle'],
    ['SQL Server','SQL Server'],
    ['MongoDB','MongoDB'],
    ['Google Storage','Google Storage'],
    ['AZURE Blob','AZURE Blob']
  ]
  const targetList = [
    ['None',''],
    ['AWS S3','AWS S3'],
    ['Google Storage','Google Storage'],
    ['AZURE Blob','AZURE Blob']
  ]  
  const targetFormat = [
    ['None',''],
    ['CSV','CSV'],
    ['JSON','JSON'],
    ['Parquet','Parquet']
  ]  
  const complianceStd = [
    ['None',''],
    ['HIPAA','HIPAA'],
    ['GDPR','GDPR'],
    ['CCPA','CCPA'],
    ['PCI DSS','PCI DSS']
    ]
const maskingMethod = [    
    ['None',''],
    ['Encryption','Encryption'],
    ['Substitution','Substitution'],
    ['Shuffling','Shuffling'],
    ['Scrambling','Scrambling'],
    ['Nulling','Nulling']
]  
  return (
    <div className="form">        
      <div className="fields">
        <h4 className="title"> Compliance Check Template</h4>
        <CssTextField  value={publishData['Template Name']} className='field' size='small' label="Name" />
        <CssTextField  value={publishData['Template Description']} className='field' multiline size='small' label="Description"/>                  
        <div className="storage">
          <FormControl sx={{ width: '500px' }} size='small'>
            <InputLabel id="demo-simple-select-label">DP Source</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={publishData['DP Source']}
              label="DP Source"
            >
            {
              sourceList.map((source) => (
                <MenuItem key={source[0]} value={source[1]} >{source[0]}</MenuItem>
              ))
            }
            </Select>
          </FormControl>
        </div>
        <div className="storage">
          <FormControl sx={{ width: '500px' }} size='small'>
            <InputLabel id="demo-simple-select-label">DP Target</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={publishData['DP Target']}
              label="DP Target"
            >
            {
              targetList.map((target) => (
                <MenuItem key={target[0]} value={target[1]} >{target[0]}</MenuItem>
              ))
            }
            </Select>
          </FormControl>
        </div>
        <div className="storage">
          <FormControl sx={{ width: '500px' }} size='small'>
            <InputLabel id="demo-simple-select-label">DP Format</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={publishData['DP Format']}
              label="DP Format"
            >
            {
              targetFormat.map((format) => (
                <MenuItem key={format[0]} value={format[1]} >{format[0]}</MenuItem>
              ))
            }
            </Select>
          </FormControl>
        </div>
        <div className="storage">
          <FormControl sx={{ width: '500px' }} size='small'>
            <InputLabel id="demo-simple-select-label">Compliance</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={publishData['Compliance']}
              label="Compliance"
            >
            {
              complianceStd.map((compliance) => (
                <MenuItem key={compliance[0]} value={compliance[1]} >{compliance[0]}</MenuItem>
              ))
            }
            </Select>
          </FormControl>
        </div>              
        <div className="storage">
          <FormControl sx={{ width: '500px' }} size='small'>
            <InputLabel id="demo-simple-select-label">Masking Method</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={publishData['Masking Method']}
              label="Masking Method"
            >
            {
              maskingMethod.map((masking) => (
                <MenuItem key={masking[0]} value={masking[1]} >{masking[0]}</MenuItem>
              ))
            }
            </Select>
          </FormControl>
        </div>                            
        <CssTextField  value={publishData['LinkRefCode']} className='field' size='small' label="Github Repo : Reference Code"/>
        <CssTextField  value={publishData['LinkReadme']} className='field' size='small' label="Github Repo : Readme" />                                                                                                                        
      </div>
    </div> 
  )    
}
export function AddComplianceCheck(props){
  const setTemplateType = props.setTemplateType
  function submitTemplate(){
    alert("Template is submitted")
  }
  const [publishData, setPublishData] = useState({
      'id':'',
      'Template Name':'',
      'Template Description':'',
      'DP Source':'',
      'DP Target':'',
      'DP Format':'',
      'Compliance':'',
      'Masking Method':'',
      'LinkRefCode':'',
      'LinkReadme':''
      })

  return (
    <div className="form">        
      <DPCompliance publishData={publishData} setPublishData={setPublishData}/>          
      <div className="button">
        <Button  sx={{width:'160px'}}variant="contained" 
              onClick={()=>{
                  setTemplateType('')
                  submitTemplate()} 
              }>
              Submit
        </Button>
      </div>
    </div> 
  )
}
export function DPQualityCheck(props){
  const [publishData,setPublishData] = useState(props.publishData)
  const formatList = targetFormat

  return (
    <div className="form">        
      <div className="fields">
        <h4 className="title"> Quality Check Template</h4>
        <CssTextField  value={publishData['Template Name']} className='field' size='small' label="Name"  onChange={(e) => setPublishData(publishData =>({
                                                    ...publishData,
                                                    ['Template Name']:e.target.value}))}/>
        <CssTextField  value={publishData['Template Description']} className='field' multiline size='small' label="Description"  onChange={(e) => setPublishData(publishData =>({
                                                    ...publishData,
                                                    ['Template Description']:e.target.value}))}/>                  
        <div className="storage">
          <FormControl sx={{ width: '500px' }} size='small'>
            <InputLabel id="demo-simple-select-label">DP Format</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={publishData['DP Format']}
              label="DP Format"
              onChange={(e) => setPublishData(publishData =>({
                ...publishData,
                ['DP Format']:e.target.value}))}
            >
            {
              formatList.map((format) => (
                <MenuItem key={format[0]} value={format[1]} >{format[0]}</MenuItem>
              ))
            }
            </Select>
          </FormControl>
        </div>
        <div className="storage">
          <FormControl sx={{ width: '500px' }} size='small'>
            <InputLabel id="demo-simple-select-label">Quality Check Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={publishData['Quality Check Type']}
              label="Quality Check Type"
              onChange={(e) => setPublishData(publishData =>({
                ...publishData,
                ['Quality Check Type']:e.target.value}))}
            >
            {
              checkTypeList.map((checkType) => (
                <MenuItem key={checkType[0]} value={checkType[1]} >{checkType[0]}</MenuItem>
              ))
            }
            </Select>
          </FormControl>
        </div>              
        <CssTextField  value={publishData['LinkRefCode']} className='field' size='small' label="Github Repo : Reference Code" onChange={(e) => setPublishData(publishData =>({
                                                    ...publishData,
                                                    ['LinkRefCode']:e.target.value}))}/>
        <CssTextField  value={publishData['LinkReadme']} className='field' size='small' label="Github Repo : Readme" onChange={(e) => setPublishData(publishData =>({
                                                    ...publishData,
                                                    ['LinkReadme']:e.target.value}))}/>                                                                                                                        
      </div>
    </div> 
  )  
}
export function DPViewQualityCheck(props){
  const publishData = get_qcheck_template(props.selectedTemplateId)
  const formatList = [
      ['None',''],
      ['CSV','CSV'],
      ['JSON','JSON'],
      ['Parquet','Parquet']
  ]
  const checkTypeList = [
      ['None',''],
      ['Completeness','Completeness'],
      ['Timeliness','Timeliness'],
      ['Validity','Validity'],
      ['Accuracy','Accuracy'],
      ['Consistency','Consistency']
  ]

  return (
      <div className="form">        
          <div className="fields">
              <h4 className="title"> Quality Check Template</h4>
              <CssTextField  value={publishData['Template Name']} className='field' size='small' label="Name" />
              <CssTextField  value={publishData['Template Description']} className='field' multiline size='small' label="Description"/>                  
              <div className="storage">
                <FormControl sx={{ width: '500px' }} size='small'>
                  <InputLabel id="demo-simple-select-label">DP Format</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={publishData['DP Format']}
                    label="DP Format"
                  >
                  {
                    formatList.map((format) => (
                      <MenuItem key={format[0]} value={format[1]} >{format[0]}</MenuItem>
                    ))
                  }
                  </Select>
                </FormControl>
              </div>
              <div className="storage">
                <FormControl sx={{ width: '500px' }} size='small'>
                  <InputLabel id="demo-simple-select-label">Quality Check Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={publishData['Quality Check Type']}
                    label="Quality Check Type"
                  >
                  {
                    checkTypeList.map((checkType) => (
                      <MenuItem key={checkType[0]} value={checkType[1]} >{checkType[0]}</MenuItem>
                    ))
                  }
                  </Select>
                </FormControl>
              </div>              
              <CssTextField  value={publishData['LinkRefCode']} className='field' size='small' label="Github Repo : Reference Code" />
              <CssTextField  value={publishData['LinkReadme']} className='field' size='small' label="Github Repo : Readme" />                                                                                                                        
          </div>
        </div> 
  )  
}
export function AddQualityCheck(props){
  const setTemplateType = props.setTemplateType
  function submitTemplate(){
    alert("Template is submitted")

  }
  const [publishData, setPublishData] = useState({
      'id':'',
      'Template Name':'',
      'Template Description':'',
      'DP Format':'',
      'Quality Check Type':'',
      'LinkRefCode':'',
      'LinkReadme':''
      })
 
  return (
      <div className="form">        
          <DPQualityCheck publishData={publishData} setPublishData={setPublishData}/>                   
          <div className="button">
              <Button  sx={{width:'160px'}}variant="contained" 
                    onClick={()=>{
                        setTemplateType('')
                        submitTemplate()} 
                    }>
                    Submit
              </Button>
          </div>
        </div> 
  )
}
function renderAddTemplateViewType(templateType, setTemplateType){
  switch(templateType){
    case "Producer":
      return <AddProducer setTemplateType={setTemplateType}/>
    case "Consumer":
      return <AddConsumer setTemplateType={setTemplateType}/>
    case "PII":
      return <AddComplianceCheck setTemplateType={setTemplateType}/>
    case "Quality":
      return <AddQualityCheck setTemplateType={setTemplateType}/>
  }
}
function DPAddTemplatesView (props){
  const [templateType, setTemplateType] = React.useState('');
  return(
    <div className="dptemplateview">
      <h4 className="title"> Add templates</h4>
      <BasicSpeedDial setTemplateType={setTemplateType}></BasicSpeedDial>
      {renderAddTemplateViewType(templateType,setTemplateType)}
    </div>
  )                                            
}
function RenderTemplateList(template_list){
  
  const {selectedIndexValue, templateViewValue,templateListTypeValue,selectedTemplateIdValue} = useContext(dpTemplateContext);
  const [selectedIndex, setSelectedIndex]= selectedIndexValue;
  const [editTemplateView, setEditTemplateView]= templateViewValue;
  const [selectedTemplateId, setSelectedTemplateId] = selectedTemplateIdValue;
  

  const handleListItemClick = (event, index,id) => {
    setSelectedIndex(index);
    setEditTemplateView(false)
    setSelectedTemplateId(id)
  };

  
  if (template_list === null){
    return
  }
  if (template_list.length > 0){
    return (
      <Box sx={{  bgcolor: 'background.paper',marginLeft:'5px',marginRight:'5px' }}>
        <List  sx={{marginLeft:'0px'}}>
          {
            template_list.map((template,index)=>(
              <ListItemButton 
                key={index}
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index,template['id'])}>
                  <ListItemIcon style={{minWidth: '30px',marginLeft:'0px'}}>
                    <InboxIcon/>
                  </ListItemIcon>
                  <ListItemText  primary={template['Template Name']}/>
              </ListItemButton>
            ))
          }
        </List>
    </Box>
    )
  } else if (template_list.length == 0){
    setEditTemplateView(true)
    return (
      <h4 className="title">No templates available yet!</h4>
    )
  }
}
function ProducerFilters(props){
  
  const [dpSource, setDpSource] = useState('')
  const [dpTarget, setDpTarget] = useState('')
  
  function get_templates(){
    if (dpSource !== '' && dpTarget !== ''){
      const template_list = get_producer_templates(dpSource,dpTarget)
      return template_list
    }
    return null
  }

  useEffect(() => {
    if (dpSource !== '' && dpTarget !== ''){
      get_templates()
    }
  }, [dpSource,dpTarget]); // 👈️ add state variables you want to track
  
  return(
    <div className='selecttemplate'>
      <div className="dropdown">
        <FormControl sx={{ width: '100%' }} size='small'>
          <InputLabel id="select-dp-source-label">Select DP Source</InputLabel>
          <Select
            labelId="select-dp-source"
            id="select-dp-source"
            value={dpSource}
            label="Select DP Source"
            onChange={(e) => {
              setDpSource(e.target.value)
            }}
          >
          {
            sourceList.map((source) => (
              <MenuItem key={source[0]} value={source[1]} >{source[0]}</MenuItem>
            ))
          }
          </Select>
        </FormControl>
      </div>
      <div className="dropdown">
        <FormControl sx={{ width: '100%' }} size='small'>
          <InputLabel id="select-dp-target-label">Select DP Target</InputLabel>
          <Select
            labelId="select-dp-target"
            id="select-dp-target"
            value={dpTarget}
            label="Select DP Target"
            onChange={(e) => {
              setDpTarget(e.target.value)
            }}
          >
          {
            targetList.map((target) => (
              <MenuItem key={target[0]} value={target[1]} >{target[0]}</MenuItem>
            ))
          }
          </Select>
        </FormControl>
      </div>
      <Divider variant="fullWidth" />
      {RenderTemplateList(get_templates())}
      
    </div>
  )
}
function ConsumerFilters(props){
  const [dpSource, setDpSource] = useState('')
  const [dpConsumingTool, setDpConsumingTool] = useState('')
  
  function get_templates(){
    if (dpSource !== '' && dpConsumingTool !== ''){
      const template_list = get_consumer_templates(dpSource,dpConsumingTool)
      return template_list
    }
    return null
  }

  useEffect(() => {
    if (dpSource !== '' && dpConsumingTool !== ''){
      get_templates()
    }
  }, [dpSource,dpConsumingTool]); // 👈️ add state variables you want to track
  
  return(
    <div className='selecttemplate'>
      <div className="dropdown">
        <FormControl sx={{ width: '100%' }} size='small'>
          <InputLabel id="select-dp-source-label">Select DP Source</InputLabel>
          <Select
            labelId="select-dp-source"
            id="select-dp-source"
            value={dpSource}
            label="Select DP Source"
            onChange={(e) => {
              setDpSource(e.target.value)
            }}
          >
          {
            sourceList.map((source) => (
              <MenuItem key={source[0]} value={source[1]} >{source[0]}</MenuItem>
            ))
          }
          </Select>
        </FormControl>
      </div>
      <div className="dropdown">
        <FormControl sx={{ width: '100%' }} size='small'>
          <InputLabel id="select-dp-target-label">Select DP Consuming Tool</InputLabel>
          <Select
            labelId="select-dp-target"
            id="select-dp-target"
            value={dpConsumingTool}
            label="Select DP Consuming Tool"
            onChange={(e) => {
              setDpConsumingTool(e.target.value)
            }}
          >
          {
            consumingToolList.map((consumingTool) => (
              <MenuItem key={consumingTool[0]} value={consumingTool[1]} >{consumingTool[0]}</MenuItem>
            ))
          }
          </Select>
        </FormControl>
      </div>
      <Divider variant="fullWidth" />
      {RenderTemplateList(get_templates())}
    </div>
  )
}
function ComplianceFilters(props){
  
  const sourceList = targetFormat
  const [dpSource, setDpSource] = useState('')
  const [dpCompliance, setDpCompliance] = useState('')
  
  function get_templates(){
    if (dpSource !== '' && dpCompliance !== ''){
      const template_list = get_compliance_templates(dpSource,dpCompliance)
      return template_list
    }
    return null
  }

  useEffect(() => {
    if (dpSource !== '' && dpCompliance !== ''){
      get_templates()
    }
  }, [dpSource,dpCompliance]); // 👈️ add state variables you want to track
  
  return(
    <div className='selecttemplate'>
      <div className="dropdown">
        <FormControl sx={{ width: '100%' }} size='small'>
          <InputLabel id="select-dp-source-label">Select DP Source</InputLabel>
          <Select
            labelId="select-dp-source"
            id="select-dp-source"
            value={dpSource}
            label="Select DP Source"
            onChange={(e) => {
              setDpSource(e.target.value)
            }}
          >
          {
            sourceList.map((source) => (
              <MenuItem key={source[0]} value={source[1]} >{source[0]}</MenuItem>
            ))
          }
          </Select>
        </FormControl>
      </div>
      <div className="dropdown">
        <FormControl sx={{ width: '100%' }} size='small'>
          <InputLabel id="select-dp-target-label">Select Compliance</InputLabel>
          <Select
            labelId="select-dp-target"
            id="select-dp-target"
            value={dpCompliance}
            label="Select DP Consuming Tool"
            onChange={(e) => {
              setDpCompliance(e.target.value)
            }}
          >
          {
            complianceStd.map((cStd) => (
              <MenuItem key={cStd[0]} value={cStd[1]} >{cStd[0]}</MenuItem>
            ))
          }
          </Select>
        </FormControl>
      </div>
      <Divider variant="fullWidth" />
      {RenderTemplateList(get_templates())}
    </div>
  )
}
function QualityCheckFilters(props){
  
  const formatList = targetFormat
  const [dpFormat, setDpFormat] = useState('')
  const [dpCheckType, setDpCheckType] = useState('')
  
  function get_templates(){
    if (dpFormat !== '' && dpCheckType !== ''){
      const template_list = get_qcheck_templates(dpFormat,dpCheckType)
      return template_list
    }
    return null
  }

  useEffect(() => {
    if (dpFormat !== '' && dpCheckType !== ''){
      get_templates()
    }
  }, [dpFormat,dpCheckType]); // 👈️ add state variables you want to track
  
  return(
    <div className='selecttemplate'>
      <div className="dropdown">
        <FormControl sx={{ width: '100%' }} size='small'>
          <InputLabel id="select-dp-source-label">Select DP Source</InputLabel>
          <Select
            labelId="select-dp-source"
            id="select-dp-source"
            value={dpFormat}
            label="Select DP Source"
            onChange={(e) => {
              setDpFormat(e.target.value)
            }}
          >
          {
            formatList.map((format) => (
              <MenuItem key={format[0]} value={format[1]} >{format[0]}</MenuItem>
            ))
          }
          </Select>
        </FormControl>
      </div>
      <div className="dropdown">
        <FormControl sx={{ width: '100%' }} size='small'>
          <InputLabel id="select-dp-target-label">Select Compliance</InputLabel>
          <Select
            labelId="select-dp-target"
            id="select-dp-target"
            value={dpCheckType}
            label="Select DP Consuming Tool"
            onChange={(e) => {
              setDpCheckType(e.target.value)
            }}
          >
          {
            checkTypeList.map((checkType) => (
              <MenuItem key={checkType[0]} value={checkType[1]} >{checkType[0]}</MenuItem>
            ))
          }
          </Select>
        </FormControl>
      </div>
      <Divider variant="fullWidth" />
      {RenderTemplateList(get_templates())}
      
    </div>
  )
}
function renderSpecificFilters(listType){
  switch(listType){
    case "Producer":
      return <ProducerFilters/>
    case "Consumer":
      return <ConsumerFilters/>
    case "Compliance":
        return <ComplianceFilters/>      
    case "Quality Check":
      return <QualityCheckFilters/>
  }
}
function DPTemplatesListFilter(props){
  const {selectedIndexValue, templateViewValue,templateListTypeValue} = useContext(dpTemplateContext);
  const [templateListType, setTemplateListType] = templateListTypeValue;
  
  return(
    <div className="dplist">
      <h4 className="title"> Available Templates</h4>
      <div className="dropdown">
        <FormControl sx={{ width: '100%' }} size='small'>
          <InputLabel id="demo-simple-select-label">Select Template Type</InputLabel>
          <Select
            labelId="select-template-type"
            id="select-template-type"
            value={templateListType}
            label="Select Template Type"
            onChange={(e) => setTemplateListType(e.target.value)}
          >
          {
            templateTypes.map((templateType) => (
              <MenuItem key={templateType[0]} value={templateType[1]} >{templateType[0]}</MenuItem>
            ))
          }
          </Select>
        </FormControl>
      </div>
      <Divider variant="fullWidth" />
      {renderSpecificFilters(templateListType)}
    </div>
  )  
}
export function ViewProducer(props){
  const selectedTemplateId = props.selectedTemplateId
  return (
    <div className="form">        
      <DPViewProducer selectedTemplateId={selectedTemplateId} />
    </div> 
  )
}
export function ViewConsumer(props){
  const selectedTemplateId = props.selectedTemplateId
  return (
    <div className="form">        
      <DPViewConsumer selectedTemplateId={selectedTemplateId} />
    </div> 
  )
}
export function ViewCompliance(props){
  const selectedTemplateId = props.selectedTemplateId
  return (
    <div className="form">        
      <DPViewCompliance selectedTemplateId={selectedTemplateId} />
    </div> 
  )
}
export function ViewQualityCheck(props){
  const selectedTemplateId = props.selectedTemplateId
  return (
    <div className="form">        
      <DPViewQualityCheck selectedTemplateId={selectedTemplateId} />
    </div> 
  )
}
function renderViewTemplate(selectedIndex,templateListType,selectedTemplateId){
  const template_data = get_producer_template(selectedTemplateId)
  switch(templateListType){
    case "Producer":
      return <ViewProducer selectedTemplateId={selectedTemplateId}/>
    case "Consumer":
      return <ViewConsumer selectedTemplateId={selectedTemplateId}/>
    case "Compliance":
        return <ViewCompliance selectedTemplateId={selectedTemplateId}/>      
    case "Quality Check":
      return <ViewQualityCheck selectedTemplateId={selectedTemplateId}/>
  }
}
function DPViewTemplatesView (props){

  const {selectedIndexValue, templateViewValue,templateListTypeValue,selectedTemplateIdValue} = useContext(dpTemplateContext);
  const [selectedIndex, setSelectedIndex]= selectedIndexValue;
  const [editTemplateView, setEditTemplateView]= templateViewValue;
  const [templateListType, setTemplateListType] = templateListTypeValue;
  const [selectedTemplateId, setSelectedTemplateId] = selectedTemplateIdValue;
  
  const [templateType, setTemplateType] = React.useState('');
  //const publishData = props.publishData
  //const setPublishData = props.setPublishData
  //const refs = props.refs
  //console.log(refs)
  
  return(
    <div className="dptemplateview">
      <div>
        <IconButton sx={{float:'right'}} onClick={() => {    setEditTemplateView(true)  }}>
          <CloseIcon fontSize='small' >Close</CloseIcon>
        </IconButton>
      </div>
      {renderViewTemplate(selectedIndex,templateListType,selectedTemplateId)}
    </div>
  )                                            
}
function renderEditOrDisplayTemplate(editTemplateView){
  if (editTemplateView === true){
    //console.log('rendering add template')
    return <DPAddTemplatesView/>
  } else{
    //console.log('rendering view template')
    return <DPViewTemplatesView />
  }
}
export const dpTemplateContext = createContext();

export default function DPPlatformServices() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [editTemplateView, setEditTemplateView] = React.useState(true);
  const [templateListType, setTemplateListType] = React.useState('')
  const [selectedTemplateId, setSelectedTemplateId] = React.useState(-1)
  return (
    <dpTemplateContext.Provider value={{selectedIndexValue:[selectedIndex, setSelectedIndex],
                                        templateViewValue:[editTemplateView, setEditTemplateView],
                                        templateListTypeValue:[templateListType, setTemplateListType],
                                        selectedTemplateIdValue:[selectedTemplateId, setSelectedTemplateId]
                                      }}>
      <div className="dpservicepage">
          
        <DPTemplatesListFilter/>
        {renderEditOrDisplayTemplate(editTemplateView)}
        
      </div>
    </dpTemplateContext.Provider>
  )
}